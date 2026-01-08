import { useEffect, useMemo, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { departments } from "@/constants/departments";
import { UserProfile } from "@/types/user";
import axios from "@/api/axios";
import { useUserPagination } from "@/hooks/useUserPagination";

export default function SearchMate() {
  const [selected, setSelected] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { items, hasMore, init, loadMore } = useUserPagination();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const PAGE_SIZE = 10;

  /* ================= 학부 토글 ================= */
  const toggleDept = (dept: string) => {
    setSelected((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  /* ================= 검색 실행 ================= */
  const handleSearch = () => {
    setSearchKeyword(keyword.trim());
  };

  /* ================= 사용자 조회 ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint =
          selected.length > 0 || searchKeyword
            ? "/user/filter"
            : "/user/findAll";

        const params: Record<string, string> = {};

        if (selected.length > 0) {
          params.departments = selected.join(",");
        }

        if (searchKeyword) {
          params.name = searchKeyword;
        }

        const res = await axios.get(endpoint, { params });
        init(res.data); // ✅ 여기만 남김
      } catch {
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selected, searchKeyword]);

  /*  goodKeywordCount 기준 정렬 */
  const sortedUsers = useMemo(() => {
    return [...items].sort(
      (a, b) => (b.goodKeywordCount ?? 0) - (a.goodKeywordCount ?? 0)
    );
  }, [items]);

  /* ================= UI ================= */
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
            placeholder="원하는 메이트의 이름을 검색해보세요."
            title={
              <>
                팀원으로 적합한 <span className="text-[#00C3CC]">메이트</span>를
                찾아보세요!
              </>
            }
          />

          <div className="flex gap-9.5 mt-20">
            {/* ================= 왼쪽 필터 ================= */}
            <aside className="w-80 top-24 self-start">
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

              <div className="bg-white border-[#A1E6EA] rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden border-2">
                <div className="mt-5 flex flex-col mb-5">
                  {departments.map((dept) => {
                    const checked = selected.includes(dept);

                    return (
                      <label
                        key={dept}
                        className="w-full h-12 px-8 flex items-center gap-4 cursor-pointer hover:bg-[#F5F8F8] active:bg-[#E1EDF0]"
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleDept(dept)}
                        />

                        <img
                          src={
                            checked
                              ? "/images/checked.svg"
                              : "/images/check.svg"
                          }
                          alt="checkbox"
                          className="w-5 h-5 block"
                        />

                        <span className="text-base font-medium text-[#222829]">
                          {dept}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/*  메이트 리스트 */}

            <section className="flex-1">
              {loading && (
                <p className="text-center text-sm text-gray-400 mt-20">
                  메이트를 불러오는 중입니다...
                </p>
              )}

              {!loading && error && (
                <p className="text-center text-sm text-red-500 mt-20">
                  {error}
                </p>
              )}

              {!loading && sortedUsers.length > 0 && (
                <div className="grid grid-cols-1 gap-2.5">
                  {sortedUsers.map((user) => (
                    <ProfileCard key={user.userId} user={user} />
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-8">
                {hasMore ? (
                  <div
                    className="w-80 px-2 py-5 bg-[#FFFFFF] rounded outline outline-2 outline-offset-[-2px] outline-[#00C3CC] inline-flex justify-center items-center gap-5 
                  hover:bg-[#F5F8F8] active:bg-[#E1EDF0]"
                  >
                    <button
                      onClick={loadMore}
                      className="justify-start text-[#00C3CC] text-lg font-bold"
                    >
                      더보기
                    </button>
                  </div>
                ) : (
                  <p className="text-right text-[#B7C4C7] text-base font-medium">
                    더 이상 불러올 메이트가 없습니다
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* TOP 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="
    fixed
    bottom-32 right-20
    z-50
    w-13 h-13
    bg-[#E1EDF0]
    rounded-full
    inline-flex items-center justify-center gap-2
    hover: shadow-[0px_0px_8px_0px_rgba(225,237,240,1.00)]
    hover:bg-[#D9E4E8]
    active:bg-[#B7C4C7]
    transition
  "
      >
        <img src="/images/top.svg" className="w-7 h-3.5" alt="top" />
      </button>

      <Footer />
    </div>
  );
}
