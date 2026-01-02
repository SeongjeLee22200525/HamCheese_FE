"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  const handleGoogleSuccess = async (credential: string) => {
    console.log("idToken:", credential);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/exists`,
        {
          idToken: credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response:", res.data);

      const data = res.data;

      if (data.exists) {
        // 기존 회원
        router.push("/searchmate");
      } else {
        // 신규 회원
        router.push({
          pathname: "/joinmc",
          query: {
            email: data.email,
            socialId: data.socialId,
          },
        });
      }
    } catch (error: any) {
      if (error.response) {
        // 서버가 응답을 준 경우
        console.error("❌ server error:", error.response.status);
        console.error("❌ server data:", error.response.data);
      } else {
        // 요청 자체가 실패한 경우
        console.error("🔥 request failed:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-10">
          {/* 일러스트 */}
          <div className="w-[920px] h-[384px] bg-[#F5F7F7] flex items-center justify-center">
            <span className="text-4xl font-normal text-black">
              일러스트/로고
            </span>
          </div>

          {/* 버튼 */}
          <div className="relative w-[360px] h-[56px]">
            {/* 기존 디자인 */}
            <div
              className="
                absolute inset-0
                flex items-center justify-center gap-3
                rounded-full border border-[#D0D7DE]
                text-[#222829] font-medium
                bg-white
              "
            >
              <Image
                src="/images/google-logo.png"
                alt="Google"
                width={24}
                height={24}
              />
              Google로 계속하기
            </div>

            {/* 실제 Google 로그인 */}
            <div className="absolute inset-0 opacity-0">
              <GoogleLogin
                onSuccess={(res) => {
                  if (res.credential) {
                    handleGoogleSuccess(res.credential);
                  }
                }}
                onError={() => {
                  console.error("❌ Google Login Failed");
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
