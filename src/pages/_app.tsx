import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useRouter } from "next/router";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    const pathname = router.pathname;

    // 🔓 로그인 없이 허용할 페이지들
    const publicPages = ["/", "/signin", "/joinmc"];

    const isPublicPage = publicPages.includes(pathname);
    const isSigninPage = pathname === "/signin";

    // 로그인 안 됐고, 공개 페이지도 아니면 → signin
    if (!token && !isPublicPage) {
      router.replace("/signin");
      return;
    }

    // 로그인 됐는데 signin 접근 → index
    if (token && isSigninPage) {
      router.replace("/");
    }
  }, [router.pathname]);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
