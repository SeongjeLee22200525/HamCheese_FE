import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["pard-fileupload-practice.s3.ap-northeast-2.amazonaws.com"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          /**
           * 🔥 핵심
           * Google OAuth iframe → postMessage 허용
           * (회원가입 페이지 이동 안 되던 문제 해결)
           */
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },

          /**
           * ❌ 절대 넣지 말 것
           * 아래 설정이 있으면 GoogleLogin 깨짐
           *
           * Cross-Origin-Embedder-Policy: require-corp
           */
        ],
      },
    ];
  },
};

export default nextConfig;
