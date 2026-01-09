import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";
import ChatWidgetRoot from "@/components/chat/ChatWidgetRoot";
import { SnackbarProvider } from "@/providers/SnackbarProvider";

/** 로그인 필요한 페이지 */
const PROTECTED_ROUTES = ["/searchmate", "/recruitmate"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hydrateUser = useUserStore((s) => s.hydrateUser);
  const user = useUserStore((s) => s.user);
  const hydrated = useUserStore((s) => s.hydrated);

  /* 1️⃣ 최초 1회 유저 복원 */
  useEffect(() => {
    hydrateUser();
  }, []);

  /* 2️⃣ 보호 라우트 가드 (⭐ hydration 이후에만 실행) */
  useEffect(() => {
    if (!hydrated) return; // 🔥 핵심

    const isProtected = PROTECTED_ROUTES.includes(router.pathname);

    if (isProtected && !user?.myId) {
      router.replace("/signin");
    }
  }, [hydrated, router.pathname, user?.myId]);

  /* 3️⃣ hydration 전에는 화면 렌더링 차단 (깜빡임/오작동 방지) */
  if (!hydrated) {
    return null; // 또는 <Loading />
  }

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
        <SnackbarProvider>
          <Component {...pageProps} />

          {/* 로그인된 경우에만 채팅 위젯 */}
          {user?.myId && <ChatWidgetRoot />}
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </>
  );
}
