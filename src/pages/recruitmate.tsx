import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/SearchBar";

import RecruitingList from "@/components/recruiting/RecruitingList";

import { departments } from "@/constants/departments";
import { types } from "@/constants/types";

import { Recruiting } from "@/types/recruiting";
import { filterRecruitings } from "@/api/recruiting";
import Snackbar from "@/components/common/Snackbar";

export default function RecruitMate() {
  const router = useRouter();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [recruitings, setRecruitings] = useState<Recruiting[]>([]);

  //모집글 쓰기 후 스낵바
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const created = sessionStorage.getItem("recruitingCreated");

    if (created === "true") {
      setShowSnackbar(true);
      sessionStorage.removeItem("recruitingCreated"); // ✅ 1회성
    }
  }, []);
  //모집글 삭제 후 스낵바
  const [showDeleteSnackbar, setShowDeleteSnackbar] = useState(false);

  useEffect(() => {
    const deleted = sessionStorage.getItem("recruitingDeleted");

    if (deleted === "true") {
      setShowDeleteSnackbar(true);
      sessionStorage.removeItem("recruitingDeleted"); // ✅ 1회성
    }
  }, []);

  const toggleItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const fetchRecruitings = async (searchName?: string) => {
    const data = await filterRecruitings({
      types: selectedTypes,
      departments: selectedDepartments,
      name: searchName,
    });

    setRecruitings(data);
  };

  const handleSearch = () => {
    fetchRecruitings(keyword.trim());
  };

  useEffect(() => {
    fetchRecruitings(keyword.trim());
  }, [selectedTypes, selectedDepartments]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="w-full mx-auto px-50 py-12">
          {/* 검색바 */}
          <SearchBar
            value={keyword}
            onChange={setKeyword}
            onSearch={handleSearch}
            placeholder="원하는 팀플을 검색해보세요."
            title={
              <>
                참여하고 싶은{" "}
                <span className="text-[#00C3CC]">팀 프로젝트</span>를
                찾아보세요!
              </>
            }
          />

          <div className="flex gap-9.5 mt-20">
            {/* 왼쪽 필터 */}
            <aside className="w-80 shrink-0 top-24 self-start">
              {/* 유형별 필터 */}
              <div className="relative">
                <img
                  src="/images/Rectangle.svg"
                  alt="filter header"
                  className="w-60 block"
                />
                <h3 className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-extrabold text-white">
                  유형별 필터
                </h3>
              </div>

              <div className="bg-white border-[#6EC6CC] rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden border-2 mb-10">
                <div className="mt-5 mb-5 flex flex-col">
                  {types.map((type) => {
                    const checked = selectedTypes.includes(type);

                    return (
                      <label
                        key={type}
                        className="
                          w-full
                          h-12
                          px-8
                          flex items-center
                          gap-4
                          cursor-pointer
                          hover:bg-[#F5F8F8]
                          active:bg-[#E1EDF0]
                        "
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleItem(type, setSelectedTypes)}
                        />

                        {/* ✅ SVG 체크박스 */}
                        <img
                          src={
                            checked
                              ? "/images/checked.svg"
                              : "/images/check.svg"
                          }
                          alt="checkbox"
                          className="w-5 h-5 block"
                        />

                        <span className="text-base font-medium text-[#222829] leading-none">
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
                  className="w-60 block"
                />
                <h3 className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-extrabold text-white">
                  학부별 필터
                </h3>
              </div>

              <div className="bg-white border-[#6EC6CC] rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden border-2">
                <div className="mt-5 mb-5 flex flex-col">
                  {departments.map((dept) => {
                    const checked = selectedDepartments.includes(dept);

                    return (
                      <label
                        key={dept}
                        className="
                          w-full
                          h-12
                          px-8
                          flex items-center
                          gap-4
                          cursor-pointer
                          hover:bg-[#F5F8F8]
                          active:bg-[#E1EDF0]
                        "
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() =>
                            toggleItem(dept, setSelectedDepartments)
                          }
                        />

                        {/* ✅ SVG 체크박스 */}
                        <img
                          src={
                            checked
                              ? "/images/checked.svg"
                              : "/images/check.svg"
                          }
                          alt="checkbox"
                          className="w-5 h-5 block"
                        />

                        <span className="text-base font-medium text-[#222829] leading-none">
                          {dept}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* 오른쪽 카드 영역 */}
            <section className="flex-1">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => router.push("/recruitmate/create")}
                  className="w-60 h-14 rounded bg-[#00C3CC] text-[#F5F8F8] text-lg font-extrabold hover:bg-[#0FA4AB] active:bg-[#1A858A]"
                >
                  모집글 쓰기
                </button>
              </div>

              <RecruitingList
                items={recruitings}
                onClickItem={(id) => router.push(`/recruitmate/${id}`)}
              />
            </section>
          </div>
        </div>
      </main>
      {showSnackbar && (
        <Snackbar
          message="모집글에 게시되었습니다."
          actionText="확인"
          duration={5000}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      {showDeleteSnackbar && (
        <Snackbar
          message="글이 삭제되었어요."
          actionText="확인"
          duration={5000}
          onClose={() => setShowDeleteSnackbar(false)}
        />
      )}

      <Footer />
    </div>
  );
}
