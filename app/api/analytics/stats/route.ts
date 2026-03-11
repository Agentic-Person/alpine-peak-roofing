import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
const GA4_REST_BASE = 'https://analyticsdata.googleapis.com/v1beta';

function getAuthClient() {
  let privateKey: string | undefined;
  if (process.env.GA_PRIVATE_KEY_B64) {
    privateKey = Buffer.from(process.env.GA_PRIVATE_KEY_B64, 'base64').toString('utf-8');
  } else {
    privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
  }

  return new JWT({
    email: process.env.GA_CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });
}

async function ga4Post(token: string, endpoint: string, body: object) {
  const res = await fetch(`${GA4_REST_BASE}/properties/${propertyId}:${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GA4 REST ${endpoint} ${res.status}: ${text}`);
  }
  return res.json();
}

export async function GET() {
  if (!propertyId || !process.env.GA_CLIENT_EMAIL || (!process.env.GA_PRIVATE_KEY && !process.env.GA_PRIVATE_KEY_B64)) {
    return NextResponse.json({ error: 'Missing GA4 environment variables' }, { status: 500 });
  }

  try {
    const auth = getAuthClient();
    const tokenRes = await auth.getAccessToken();
    const token = tokenRes.token;
    if (!token) throw new Error('Failed to obtain access token');

    const [overview, topPagesRes, realtimeRes] = await Promise.all([
      ga4Post(token, 'runReport', {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
        ],
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

    const metricValues = overview?.rows?.[0]?.metricValues ?? [];
    const sessions  = parseInt(metricValues[0]?.value ?? '0');
    const users     = parseInt(metricValues[1]?.value ?? '0');
    const pageviews = parseInt(metricValues[2]?.value ?? '0');

    const topPages = (topPagesRes?.rows ?? []).map((row: { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] }) => ({
      path:  row.dimensionValues?.[0]?.value ?? '/',
      views: parseInt(row.metricValues?.[0]?.value ?? '0'),
    }));

    const activeNow = parseInt(
      realtimeRes?.rows?.[0]?.metricValues?.[0]?.value ?? '0'
    );

    return NextResponse.json({
      period: 'Last 30 days',
      sessions,
      users,
      pageviews,
      activeNow,
      topPages,
      updatedAt: new Date().toISOString(),
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('GA4 REST error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
