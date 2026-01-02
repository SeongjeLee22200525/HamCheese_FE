"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    flow: "implicit", // idToken 받기
    onSuccess: async (tokenResponse) => {
      const idToken = tokenResponse.id_token;
      if (!idToken) return;

      // 서버에 회원 존재 여부 확인
      const res = await fetch(
        "http://172.18.157.165:8080/auth/google/exists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await res.json();

      if (data.exists) {
        // 이미 회원 → 메인 페이지
        router.push("/searchmate");
      } else {
        // 신규 회원 → 회원가입 페이지
        router.push({
          pathname: "/joinmc",
          query: {
            email: data.email,
            socialId: data.socialId,
          },
        });
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-10">
          {/* 일러스트 / 로고 영역 */}
          <div className="w-[920px] h-[384px] bg-[#F5F7F7] flex items-center justify-center">
            <span className="text-4xl font-normal font-['Pretendard_Variable'] text-black">
              일러스트/로고
            </span>
          </div>

          {/* ✅ 디자인 동일 / 동작만 변경 */}
          <button
            onClick={() => googleLogin()}
            className="
              w-[360px] h-[56px]
              flex items-center justify-center gap-3
              rounded-full border border-[#D0D7DE]
              text-[#222829] font-medium font-['Pretendard_Variable']
              hover:bg-gray-50 active:bg-gray-100
              transition
            "
          >
            <Image
              src="/images/google-logo.png"
              alt="Google"
              width={24}
              height={24}
            />
            Google로 계속하기
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
