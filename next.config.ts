import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // AVIF first, WebP fallback. Lighthouse measured 477 KiB of avoidable image
    // bytes on the homepage, most of it the hero and inspection JPEGs.
    formats: ["image/avif", "image/webp"],
    // 1440 and 1920 were both missing near the common desktop widths, so a
    // 1335 px viewport was served the 1920 w candidate.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    // 68 is used for the LCP hero; Next 15 rejects quality values not listed here.
    qualities: [68, 75],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adueyerxzutuuwtxyage.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "d2xsxph8kpxj0f.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
