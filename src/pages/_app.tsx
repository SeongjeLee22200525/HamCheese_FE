import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";
import ChatWidgetRoot from "@/components/chat/ChatWidgetRoot";
import { SnackbarProvider } from "@/providers/SnackbarProvider";
import { useSnackbar } from "@/providers/SnackbarProvider";

const PROTECTED_ROUTES = ["/searchmate", "/recruitmate"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hydrateUser = useUserStore((s) => s.hydrateUser);
  const user = useUserStore((s) => s.user);

  /* 1️⃣ 최초 유저 복원 */
  useEffect(() => {
    hydrateUser();
  }, []);

  /* 2️⃣ 로그인 필요한 페이지만 가드 */
  useEffect(() => {
    const isProtected = PROTECTED_ROUTES.includes(router.pathname);

    if (isProtected && !user?.myId) {
      router.replace("/signin");
    }
  }, [router.pathname, user?.myId]);

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
        {/* ✅ 여기 안으로 전부 넣는다 */}
        <SnackbarProvider>
          <Component {...pageProps} />

          {/* ✅ 이제 ChatWidget도 Provider 안 */}
          {user?.myId && <ChatWidgetRoot />}
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </>
  );
}
