'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Radio } from 'lucide-react';

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

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export default function AnalyticsWidget() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch('/api/analytics/stats')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  // Loading skeleton — matches column heading height so layout doesn't shift
  if (!data) {
    return (
      <>
        <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-[#c9a84c]" />
          Live Stats
        </h3>
        <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
      </>
    );
  }

  if (data.error) return null;

  return (
    <>
      {/* Heading — same style as other footer columns */}
      <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <TrendingUp className="h-3.5 w-3.5 text-[#c9a84c]" />
        Live Stats
        {data.activeNow > 0 && (
          <span className="ml-auto flex items-center gap-0.5">
            <Radio className="h-2.5 w-2.5 text-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px]">{data.activeNow}</span>
          </span>
        )}
      </h3>

      {/* Compact stat row */}
      <div className="grid grid-cols-3 gap-1 mb-3">
        {[
          { label: 'Visitors',  value: fmt(data.users) },
          { label: 'Views',     value: fmt(data.pageviews) },
          { label: 'Sessions',  value: fmt(data.sessions) },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-white font-bold text-sm leading-none">{value}</p>
            <p className="text-white/40 text-[10px] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Top pages */}
      {data.topPages.length > 0 && (
        <ul className="space-y-1">
          {data.topPages.slice(0, 3).map((page, i) => (
            <li key={i} className="flex items-center justify-between gap-1">
              <span className="text-white/60 text-[10px] truncate">{page.path}</span>
              <span className="text-[#c9a84c] text-[10px] font-medium shrink-0">{fmt(page.views)}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-white/25 text-[10px] mt-2">Google Analytics · 30d</p>
    </>
  );
}
