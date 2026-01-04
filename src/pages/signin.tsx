import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";

export default function Home() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleGoogleSuccess = async (credential: string) => {
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

      const data = res.data;

      // 기존 회원
      if (data.exists) {
        // UI 상태
        setUser({
          myId: data.myId,
          name: data.name,
        });

        // 로그인 증표
        document.cookie = `myId=${data.myId}; path=/`;
        document.cookie = `name=${encodeURIComponent(data.name)}; path=/`;

        router.push("/searchmate");
        return;
      }

      // 신규 회원
      router.push({
        pathname: "/joinmc",
        query: {
          email: data.email,
          socialId: data.socialId,
        },
      });
    } catch (error: any) {
      // 실제 서비스에선 toast 등으로 대체
      console.error("로그인 처리 중 오류", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-16.5">
        <div className="flex flex-col items-center gap-18">
          {/* 일러스트 영역 */}
          <img src="/loginlogo.png"></img>

          {/* Google 로그인 버튼 */}
          <div className="relative w-[360px] h-[56px]">
            <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-full border border-[#D0D7DE] bg-white">
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

            <div className="absolute inset-0 opacity-0">
              <GoogleLogin
                onSuccess={(res) => {
                  if (res.credential) {
                    handleGoogleSuccess(res.credential);
                  }
                }}
                onError={() => {
                  console.error("Google Login Failed");
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
