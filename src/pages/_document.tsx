import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 🔥 파비콘 강제 선언 (캐시 무효화 포함) */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=20260107" />
        <link rel="alternate icon" href="/favicon.ico?v=20260107" />
      </Head>
      <body className="antialiased">
        <Main />
        <div id="snackbar-root" />
        <NextScript />
      </body>
    </Html>
  );
}
