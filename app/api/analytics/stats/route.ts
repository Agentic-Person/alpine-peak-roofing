import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

function getClient() {
  // Prefer base64-encoded key (avoids all newline/quote escaping issues)
  // Fall back to raw key with newline conversion
  let privateKey: string | undefined;
  if (process.env.GA_PRIVATE_KEY_B64) {
    privateKey = Buffer.from(process.env.GA_PRIVATE_KEY_B64, 'base64').toString('utf-8');
  } else {
    privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
  }
  const clientEmail = process.env.GA_CLIENT_EMAIL;

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });
}

export async function GET() {
  if (!propertyId || !process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY) {
    return NextResponse.json({ error: 'Missing GA4 environment variables' }, { status: 500 });
  }

  try {
    const client = getClient();

    // Run all queries in parallel
    const [overviewResponse, topPagesResponse, activeResponse] = await Promise.all([
      // Last 30 days: sessions, users, pageviews
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
        ],
      }),

      // Top 5 pages this month
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 5,
      }),

      // Active users right now
      client.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: 'activeUsers' }],
      }),
    ]);

    const overview = overviewResponse[0]?.rows?.[0]?.metricValues ?? [];
    const sessions = parseInt(overview[0]?.value ?? '0');
    const users = parseInt(overview[1]?.value ?? '0');
    const pageviews = parseInt(overview[2]?.value ?? '0');

    const topPages = (topPagesResponse[0]?.rows ?? []).map(row => ({
      path: row.dimensionValues?.[0]?.value ?? '/',
      views: parseInt(row.metricValues?.[0]?.value ?? '0'),
    }));

    const activeNow = parseInt(
      activeResponse[0]?.rows?.[0]?.metricValues?.[0]?.value ?? '0'
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
    console.error('GA4 API error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
