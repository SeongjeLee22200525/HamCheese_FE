import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useUserStore } from "@/stores/useUserStore";
import { getSendbird } from "@/lib/sendbird/sendbird";

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useUserStore();

  /* ================= 서버에서 Google code 처리 ================= */
  const handleGoogleCode = async (code: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/code`,
        { code },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;

      /* ================= 기존 회원 ================= */
      if (data.exists) {
        setUser({
          myId: data.myId,
          name: data.name,
        });

        document.cookie = `myId=${data.myId}; path=/`;
        document.cookie = `name=${encodeURIComponent(data.name)}; path=/`;

        try {
          const sb = getSendbird();
          try {
            await sb.disconnect();
          } catch {}

          await sb.connect(String(data.myId));

          const profileRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/mateProfile/${data.myId}`
          );

          const { name, imageUrl, studentId, firstMajor, secondMajor } =
            profileRes.data;

          await sb.updateCurrentUserInfo({
            nickname: name,
            profileUrl: imageUrl || "/profile.svg",
          });

          await sb.currentUser?.updateMetaData(
            {
              studentId: studentId ?? "",
              major1: firstMajor ?? "",
              major2: secondMajor ?? "",
            },
            true
          );
        } catch (e) {
          console.error("❌ Sendbird sync failed", e);
        }

        router.push("/searchmate");
        return;
      }

      /* ================= 신규 회원 ================= */
      router.push({
        pathname: "/joinmc",
        query: {
          email: data.email,
          socialId: data.socialId,
        },
      });
    } catch (e) {
      console.error("❌ Google auth-code 처리 실패", e);
    }
  };

  /* ================= redirect 후 code 처리 ================= */
  useEffect(() => {
    if (!router.isReady) return;

    const code = router.query.code;
    if (typeof code === "string") {
      handleGoogleCode(code);
    }
  }, [router.isReady, router.query.code]);

  /* ================= Google 로그인 시작 ================= */
  const googleLogin = useGoogleLogin({
    flow: "auth-code", // ✅ redirect 유일 지원
    onSuccess: () => {
      // redirect 방식에서는 호출 안 됨
    },
    redirect_uri: `${typeof window !== "undefined" ? window.location.origin : ""}/signin`,
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-16.5">
        <div className="flex flex-col items-center gap-18">
          <img src="/loginlogo.png" alt="login logo" />

          <div
            onClick={() => googleLogin()}
            className="w-[360px] h-[56px] flex items-center justify-center gap-3 rounded-full border border-[#D0D7DE] bg-white cursor-pointer hover:bg-gray-50"
          >
            <Image
              src="/images/google-logo.png"
              alt="Google"
              width={24}
              height={24}
            />
            <span className="text-[#222829] font-medium">
              Google로 계속하기
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
