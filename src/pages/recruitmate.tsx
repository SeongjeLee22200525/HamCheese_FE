import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/SearchBar";

import RecruitingList from "@/components/recruiting/RecruitingList";

import { departments } from "@/constants/departments";
import { types } from "@/constants/types";

import { Recruiting } from "@/types/recruiting";
import { mockRecruitings } from "@/mocks/recruitings";

export default function RecruitMate() {
  const router = useRouter();

  /* State */

  // 필터 상태 (API 명세 대응)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // 검색
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 결과
  const [recruitings, setRecruitings] = useState<Recruiting[]>([]);

  const USE_MOCK = true; // TODO: API 연동 후 제거

  /* Effect */

  // 최초 진입 시 전체 조회
  useEffect(() => {
    if (USE_MOCK) {
      setRecruitings(mockRecruitings);
    }
  }, []);

  /* Handlers */

  const toggleItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleSearch = () => {
    setSearchKeyword(keyword.trim());

    if (!USE_MOCK) return;

    // mock 기준 필터링
    const filtered = mockRecruitings.filter(item => {
      const matchType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(item.projectType);

      const matchKeyword =
        !keyword ||
        item.title.includes(keyword) ||
        item.topic.includes(keyword);

      // 학부는 mock 데이터에 없으므로 지금은 통과
      return matchType && matchKeyword;
    });

    setRecruitings(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* 검색바 영역 */}
        <div className="max-w-[1280px] mx-auto px-10 py-12">
          <SearchBar
            value={keyword}
            onChange={setKeyword}
            onSearch={handleSearch}
            onEnter={handleSearch}
            placeholder="원하는 팀플을 검색해보세요."
            title={
              <>
                참여하고 싶은{" "}
                <span className="text-[#00C3CC]">팀 프로젝트</span>를 찾아보세요!
              </>
            }
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-10 flex gap-10">
          {/* 왼쪽 필터 */}
          <aside className="w-[260px] sticky top-24 self-start">
            {/* ---------- 유형별 필터 ---------- */}
            <div className="relative">
              <img
                src="/images/Rectangle.svg"
                alt="filter header"
                className="w-full block"
              />
              <h3 className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-extrabold text-white">
                유형별 필터
              </h3>
            </div>

            <div className="bg-white border-[#6EC6CC] border-t-0 relative rounded-bl rounded-br overflow-hidden border-2 mb-10">
              <div className="mt-5 flex flex-col mb-5">
                {types.map(type => {
                  const checked = selectedTypes.includes(type);

                  return (
                    <label
                      key={type}
                      className="w-full h-12 px-8 flex items-center gap-4 cursor-pointer hover:bg-[#F5F8F8]"
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() =>
                          toggleItem(type, setSelectedTypes)
                        }
                      />

                      <div
                        className="w-5 h-5 rounded border-2 flex items-center justify-center"
                        style={{
                          borderColor: checked ? "#6EC6CC" : "#9AA4A6",
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded"
                          style={{
                            backgroundColor: checked
                              ? "#6EC6CC"
                              : "transparent",
                          }}
                        />
                      </div>

                      <span className="text-base text-[#222829]">
                        {type}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 학부별 필터 */}
            <div className="relative">
              <img
                src="/images/Rectangle.svg"
                alt="filter header"
                className="w-full block"
              />
              <h3 className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-extrabold text-white">
                학부별 필터
              </h3>
            </div>

            <div className="bg-white border-2 border-[#6EC6CC] border-t-0 rounded-b-xl overflow-hidden">
              <div className="mt-5 mb-5 flex flex-col">
                {departments.map(dept => {
                  const checked = selectedDepartments.includes(dept);

                  return (
                    <label
                      key={dept}
                      className="w-full h-12 px-8 flex items-center gap-4 cursor-pointer select-none hover:bg-[#F5F8F8]"
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() =>
                          toggleItem(dept, setSelectedDepartments)
                        }
                      />

                      <div
                        className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                        style={{
                          borderColor: checked ? "#6EC6CC" : "#9AA4A6",
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded transition-colors"
                          style={{
                            backgroundColor: checked
                              ? "#6EC6CC"
                              : "transparent",
                          }}
                        />
                      </div>

                      <span className="text-base text-[#222829]">
                        {dept}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* 우측 피드 */}
          <section className="flex-1 min-h-[400px] rounded-xl p-6 -mt-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => router.push("/recruitmate/create")}
                className="w-72 h-16 px-2 py-5 justify-start rounded bg-[#6EC6CC] text-[#F5F8F8] text-[16px] font-extrabold "
              >
                모집글 쓰기
              </button>
            </div>

            <RecruitingList
              items={recruitings}
              onClickItem={(id) =>
                router.push(`/recruitmate/${id}`)
              }
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
