import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useUserStore } from "@/stores/useUserStore";
import ChatWidgetRoot from "@/components/chat/ChatWidgetRoot";

/**
 * 인증 없이 접근 가능한 페이지만 명시적으로 선언
 * "/" 를 startsWith로 체크하면 모든 페이지가 public이 되므로
 * 반드시 정확히 매칭해야 함
 */
const PUBLIC_ROUTES = ["/", "/signin"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user, hydrateUser } = useUserStore();
  const [hydrated, setHydrated] = useState(false);

  /**
   * 최초 앱 진입 시 유저 정보 복원
   */
  useEffect(() => {
    const run = async () => {
      await hydrateUser();
      setHydrated(true);
    };
    run();
  }, [hydrateUser]);

  /**
   * public / private route 판별
   */
  const isPublic =
    router.isReady && PUBLIC_ROUTES.includes(router.pathname);

  /**
   * - 인증 가드
   * - 로그인 ❌ + private 페이지 → /signin
   * - 로그인 ⭕ → 모든 페이지 접근 가능
   */
  useEffect(() => {
    if (!hydrated || !router.isReady) return;

    if (!user && !isPublic) {
      router.replace("/signin");
    }
  }, [hydrated, user, isPublic, router.isReady, router]);

  /**
   * - 렌더링 제어
   * - hydration 완료 전: 아무것도 안 그림
   * - 로그인 O 또는 public 페이지: 정상 렌더
   */
  const canRender = hydrated && (user || isPublic);

  return (
    <>
      <Head>
        <title>MateCheck | 나에게 FIT한 팀원 찾기</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>

      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
      >
        {canRender ? <Component {...pageProps} /> : null}

        {/* 로그인 상태에서만 내부적으로 연결됨 */}
        <ChatWidgetRoot />
      </GoogleOAuthProvider>
    </>
  );
}
