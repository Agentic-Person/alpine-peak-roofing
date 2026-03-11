import { NextResponse } from 'next/server';

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
const GA4_REST_BASE = 'https://analyticsdata.googleapis.com/v1beta';

function b64url(buf: ArrayBuffer | string): string {
  const bytes = typeof buf === 'string'
    ? Buffer.from(buf)
    : Buffer.from(buf);
  return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function getPrivateKeyPem(): string {
  let key: string | undefined;
  if (process.env.GA_PRIVATE_KEY_B64) {
    key = Buffer.from(process.env.GA_PRIVATE_KEY_B64, 'base64').toString('utf-8');
  } else {
    key = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
  }
  if (!key) throw new Error('GA private key not set');
  // Normalise line endings
  return key.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim() + '\n';
}

/** Import PKCS#8 PEM via Web Crypto (avoids OpenSSL 3.x decoder issues) */
async function importKey(pem: string): Promise<CryptoKey> {
  const der = Buffer.from(
    pem.replace(/-----[^-]+-----/g, '').replace(/\s/g, ''),
    'base64'
  );
  return crypto.subtle.importKey(
    'pkcs8',
    der,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

async function makeServiceAccountJWT(clientEmail: string, pem: string): Promise<string> {
  const key = await importKey(pem);
  const now = Math.floor(Date.now() / 1000);
  const header  = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = b64url(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }));
  const input = `${header}.${payload}`;
  const sig = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(input)
  );
  return `${input}.${b64url(sig)}`;
}

async function getAccessToken(): Promise<string> {
  const pem   = getPrivateKeyPem();
  const email = process.env.GA_CLIENT_EMAIL!;
  const jwt   = await makeServiceAccountJWT(email, pem);

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description ?? data.error ?? 'Token exchange failed');
  return data.access_token as string;
}

async function ga4Post(token: string, endpoint: string, body: object) {
  const res = await fetch(`${GA4_REST_BASE}/properties/${propertyId}:${endpoint}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GA4 ${endpoint} ${res.status}: ${text}`);
  }
  return res.json();
}

export async function GET() {
  if (!propertyId || !process.env.GA_CLIENT_EMAIL ||
      (!process.env.GA_PRIVATE_KEY && !process.env.GA_PRIVATE_KEY_B64)) {
    return NextResponse.json({ error: 'Missing GA4 environment variables' }, { status: 500 });
  }

  try {
    const token = await getAccessToken();

    const [overview, topPagesRes, realtimeRes] = await Promise.all([
      ga4Post(token, 'runReport', {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'screenPageViews' }],
      }),
      ga4Post(token, 'runReport', {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 5,
      }),
      ga4Post(token, 'runRealtimeReport', {
        metrics: [{ name: 'activeUsers' }],
      }),
    ]);

    const mv       = overview?.rows?.[0]?.metricValues ?? [];
    const sessions  = parseInt(mv[0]?.value ?? '0');
    const users     = parseInt(mv[1]?.value ?? '0');
    const pageviews = parseInt(mv[2]?.value ?? '0');

    const topPages = (topPagesRes?.rows ?? []).map((r: { dimensionValues?: {value?:string}[]; metricValues?: {value?:string}[] }) => ({
      path:  r.dimensionValues?.[0]?.value ?? '/',
      views: parseInt(r.metricValues?.[0]?.value ?? '0'),
    }));

    const activeNow = parseInt(realtimeRes?.rows?.[0]?.metricValues?.[0]?.value ?? '0');

    return NextResponse.json({ period: 'Last 30 days', sessions, users, pageviews, activeNow, topPages, updatedAt: new Date().toISOString() });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('GA4 error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
