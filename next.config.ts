import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pard-fileupload-practice.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          /**
           * 🔥 핵심
           * Google OAuth iframe → postMessage 허용
           */
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },

          /**
           * ❌ 절대 추가하면 안 됨
           * Cross-Origin-Embedder-Policy: require-corp
           */
        ],
      },
    ];
  },
};

export default nextConfig;
