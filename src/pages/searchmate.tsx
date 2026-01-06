import { useEffect, useMemo, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { departments } from "@/constants/departments";
import { UserProfile } from "@/types/user";
import axios from "@/api/axios";

export default function SearchMate() {
  const [selected, setSelected] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  /* ================= 학부 토글 ================= */
  const toggleDept = (dept: string) => {
    setPage(0);
    setUsers([]);
    setSelected((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  /* ================= 검색 실행 ================= */
  const handleSearch = () => {
    setPage(0);
    setUsers([]);
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
        const allUsers: UserProfile[] = res.data;

        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const sliced = allUsers.slice(start, end);

        setUsers((prev) => (page === 0 ? sliced : [...prev, ...sliced]));
        setHasMore(end < allUsers.length);
      } catch (e) {
        setError("데이터를 불러오지 못했습니다.");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selected, searchKeyword, page]);

  /* ================= 🔥 goodKeywordCount 기준 정렬 ================= */
  const sortedUsers = useMemo(() => {
    return [...users].sort(
      (a, b) => (b.goodKeywordCount ?? 0) - (a.goodKeywordCount ?? 0)
    );
  }, [users]);

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
            onEnter={handleSearch}
            placeholder="원하는 메이트의 이름을 검색해보세요."
            title={
              <>
                팀원으로 적합한 <span className="text-[#00C3CC]">메이트</span>를
                찾아보세요!
              </>
            }
          />

          <div className="flex gap-9.5 mt-10">
            {/* ================= 왼쪽 필터 ================= */}
            <aside className="w-[260px] sticky top-24 self-start">
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

              <div className="bg-white border-[#6EC6CC] border-t-0 rounded-b overflow-hidden border-2">
                <div className="mt-5 flex flex-col mb-5">
                  {departments.map((dept) => {
                    const checked = selected.includes(dept);

                    return (
                      <label
                        key={dept}
                        className="w-full h-12 px-8 flex items-center gap-4 cursor-pointer hover:bg-[#F5F8F8]"
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

            {/* ================= 결과 영역 ================= */}
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

              {!loading && !error && users.length === 0 && (
                <p className="text-center text-sm text-gray-400 mt-20">
                  검색 결과가 없습니다.
                </p>
              )}

              {!loading && sortedUsers.length > 0 && (
                <div className="grid grid-cols-1 gap-1.5">
                  {sortedUsers.map((user) => (
                    <ProfileCard key={user.userId} user={user} />
                  ))}
                </div>
              )}

              {hasMore && !loading && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-6 py-2 rounded-lg border border-[#6EC6CC] text-[#6EC6CC]"
                  >
                    더보기
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
