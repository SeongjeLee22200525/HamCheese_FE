import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";
import { getSendbird } from "@/lib/sendbird/sendbird";

export default function Home() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleGoogleSuccess = async (credential: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/exists`,
        { idToken: credential },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;

      if (data.exists) {
        /* 전역 상태 */
        setUser({
          myId: data.myId,
          name: data.name,
        });

        /* 쿠키 */
        document.cookie = `myId=${data.myId}; path=/`;
        document.cookie = `name=${encodeURIComponent(data.name)}; path=/`;

        /* Sendbird 인스턴스 생성 */
        const sb = getSendbird();

        try {
          try {
            await sb.disconnect();
          } catch {}

          /* Sendbird 연결 */
          await sb.connect(String(data.myId));

          /* 서버 프로필 조회 */
          const profileRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/mateProfile/${data.myId}`
          );

          const { name, imageUrl, studentId, firstMajor, secondMajor } =
            profileRes.data;

          /* Sendbird 기본 프로필 */
          await sb.updateCurrentUserInfo({
            nickname: name,
            profileUrl: imageUrl || "/profile.svg",
          });

          /* 메타데이터 */
          const metaPayload: Record<string, string> = {
            studentId: studentId ?? "",
            major1: firstMajor ?? "",
            major2: secondMajor ?? "",
          };

          await sb.currentUser?.updateMetaData(metaPayload, true);
        } catch (e) {
          console.error("❌ Sendbird profile / metadata sync failed", e);
        }

        router.push("/searchmate");
        return;
      }

      /* 신규 회원 */
      router.push({
        pathname: "/joinmc",
        query: {
          email: data.email,
          socialId: data.socialId,
        },
      });
    } catch (error: any) {
      console.error("로그인 처리 중 오류", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-16.5">
        <div className="flex flex-col items-center gap-18">
          <img src="/loginlogo.svg" />

          <span className="text-center justify-start text-[#838F91] text-base font-bold mt-2 -mb-12">학교 이메일로 회원가입해주세요.</span>

          <div className="relative w-90 h-14">
            <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-full border border-[#D0D7DE] bg-white">
              <Image
                src="/images/google-logo.svg"
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
