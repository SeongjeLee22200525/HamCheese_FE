import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { DEPARTMENTS } from "@/constants/departments";

export default function SearchMate() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-[1520px] mx-auto px-[120px] py-12">
          {/* 검색바 */}
          <SearchBar
            value=""
            onChange={() => {}}
            placeholder="원하는 사람을 검색해보세요."
            className="placeholder:text-black"
          />

          {/* 콘텐츠 영역 */}
          <div className="flex gap-10 mt-10">
            {/* 왼쪽: 학부 필터 */}
            <aside className="w-[260px] bg-white rounded-xl border border-[#6EC6CC] overflow-hidden">
              {/* 필터 헤더 */}
              <div className="relative bg-[#6EC6CC] px-5 py-4 rounded-t-xl overflow-hidden">
                <h3 className="text-sm font-semibold text-white">
                  학부별 필터
                </h3>
              </div>

              {/* 필터 목록 */}
              <div className="flex flex-col gap-4 px-8 py-4 inline-flex justify-start bg-[#FFFFFF]">
                {DEPARTMENTS.map((dept) => (
                  <label
                    key={dept}
                    className="flex items-center gap-3 text-sm text-[#222829] cursor-pointer hover:bg-[#F5F8F8]"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#838F91]"
                    />
                    {dept}
                  </label>
                ))}
              </div>
            </aside>

            {/* 오른쪽: 프로필 리스트 영역 (비워둠) */}
            <section className="flex-1 bg-white rounded-xl border min-h-[400px] flex items-center justify-center">
              <p className="text-sm text-gray-400">
                프로필 카드 영역 (추후 구현)
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
