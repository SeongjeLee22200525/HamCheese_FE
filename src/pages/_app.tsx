import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export default function App({ Component, pageProps }: AppProps) {
  console.log("🔥 _app.tsx mounted");
  const hydrateUser = useUserStore((state) => state.hydrateUser);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      {" "}
      <Component {...pageProps} />{" "}
    </GoogleOAuthProvider>
  );
}
