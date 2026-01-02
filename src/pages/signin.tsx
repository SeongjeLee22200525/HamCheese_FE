import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
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

          {/* Google 로그인 버튼 */}
          <a
            href="http://172.18.157.165:8080/oauth2/authorization/google"
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
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
