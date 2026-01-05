import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-zinc-100 flex flex-col items-center">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-16 flex items-center gap-24">
        {/* 왼쪽 영역 */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <img
            src="/images/ment.svg"
            alt="Ment"
            className="w-72 h-auto block"
          />
          <img
            src="/images/slogan.svg"
            alt="Slogan"
            className="w-full h-auto block"
          />
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex-1 flex flex-col items-center gap-8 mt-16">
          <img
            src="/images/logo.svg"
            alt="MateCheck Logo"
            className="w-140 h-auto block"
          />

          {/* 홈 전용 검색창 */}
          <div className="w-[700px] h-[72px] px-6 border border-[#6EC6CC] rounded-xl flex items-center gap-4 bg-white">
            <input
              placeholder="원하는 메이트의 이름을 검색해보세요."
              className="flex-1 text-[16px] outline-none text-[#222729] placeholder:text-[#B7C4C7]"
            />
            <img
              src="/images/search-icon.svg"
              alt="search"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
