import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export default function App({ Component, pageProps }: AppProps) {
  const hydrateUser = useUserStore((state) => state.hydrateUser);

  useEffect(() => {
    hydrateUser();
  }, []); // 최초 1회

  return (
    <>
      {/* 🔹 탭 제목 + 파비콘 */}
      <Head>
        <title>MateCheck | 나에게 FIT한 팀원 찾기</title>

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>

      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
      >
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </>
  );
}
