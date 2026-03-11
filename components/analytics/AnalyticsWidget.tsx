'use client';

import { useEffect, useState } from 'react';
import { Users, Eye, TrendingUp, Radio } from 'lucide-react';

interface AnalyticsData {
  period: string;
  sessions: number;
  users: number;
  pageviews: number;
  activeNow: number;
  topPages: { path: string; views: number }[];
  updatedAt: string;
  error?: string;
}

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function AnalyticsWidget() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/analytics/stats')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setFetchError(String(e)); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/40 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
        Loading stats…
      </div>
    );
  }

  if (fetchError) {
    return <div className="text-red-400 text-xs">Fetch error: {fetchError}</div>;
  }

  if (!data) {
    return <div className="text-yellow-400 text-xs">No data returned</div>;
  }

  if (data.error) {
    return <div className="text-orange-400 text-xs">API error: {data.error}</div>;
  }

  return (
    <div className="border-t border-white/10 pt-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-[#c9a84c]" />
        <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
          Live Site Stats
        </span>
        {data.activeNow > 0 && (
          <span className="flex items-center gap-1 ml-auto">
            <Radio className="w-3 h-3 text-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">{data.activeNow} online now</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-3 h-3 text-[#c9a84c]" />
          </div>
          <p className="text-white font-bold text-lg leading-none">{formatNumber(data.users)}</p>
          <p className="text-white/40 text-xs mt-1">Visitors</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Eye className="w-3 h-3 text-[#c9a84c]" />
          </div>
          <p className="text-white font-bold text-lg leading-none">{formatNumber(data.pageviews)}</p>
          <p className="text-white/40 text-xs mt-1">Page Views</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-[#c9a84c]" />
          </div>
          <p className="text-white font-bold text-lg leading-none">{formatNumber(data.sessions)}</p>
          <p className="text-white/40 text-xs mt-1">Sessions</p>
        </div>
      </div>

      {data.topPages.length > 0 && (
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">Top Pages (30 days)</p>
          <ul className="space-y-1">
            {data.topPages.slice(0, 3).map((page, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-white/60 text-xs truncate max-w-[160px]">{page.path}</span>
                <span className="text-[#c9a84c] text-xs font-medium">{formatNumber(page.views)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-white/25 text-xs mt-3">
        Powered by Google Analytics · {data.period}
      </p>
    </div>
  );
}
