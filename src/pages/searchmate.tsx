import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { DEPARTMENTS } from "@/constants/departments";
import { UserProfile } from "@/types/user";
import { mockUsers } from "@/mocks/mockUsers";


export default function SearchMate() {
  const [selected, setSelected] = useState<string[]>([]);
  const [keyword, setKeyword] = useState(""); // 입력용
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색용

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const USE_MOCK = true; // ← 테스트 끝나면 false


  /* 학부 토글 */
  const toggleDept = (dept: string) => {
    setPage(0);
    setSelected((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  /* 검색 실행 (버튼 + Enter 공용) */
  const handleSearch = () => {
    setPage(0);
    setUsers([]);
    setSearchKeyword(keyword.trim());
  };
  useEffect(() => {
  if (USE_MOCK) {
    setUsers(mockUsers);
    setHasMore(false);
    return;
  }

  // ⬇️ 기존 fetchUsers 코드 그대로
}, [selected, searchKeyword, page]);


  /* API 호출 */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", "10");

        if (selected.length > 0) {
          params.append("departments", selected.join(","));
        }
        if (searchKeyword) {
          params.append("name", searchKeyword);
        }

        const url =
          selected.length > 0 || searchKeyword
            ? `/user/filter?${params.toString()}`
            : `/user/findAll?${params.toString()}`;

        const res = await fetch(url);
        const data: UserProfile[] = await res.json();

        setUsers((prev) => (page === 0 ? data : [...prev, ...data]));
        setHasMore(data.length === 10);
      } catch (e) {
        setError("데이터를 불러오지 못했습니다.");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selected, searchKeyword, page]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-10 py-12">
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

          <div className="flex gap-10 mt-10">
            {/* 왼쪽 필터 */}
            <aside className="w-[260px] sticky top-24">
              {/* SVG 헤더 */}
              <div className="relative">
                <img
                  src="/images/Rectangle.svg"
                  alt="filter header"
                  className="w-full block"
                />

                {/* 헤더 텍스트 */}
                <h3 className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-extrabold text-white">
                  학부별 필터
                </h3>
              </div>

              {/* 필터 바디 */}
              <div className="bg-white border-[#6EC6CC] border-t-0 relative rounded-bl rounded-br overflow-hidden border-2">
                <div className="mt-5 flex flex-col mb-5">
                  {DEPARTMENTS.map((dept) => {
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

                        <span className="text-base text-[#222829]">{dept}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* 결과 영역 */}
            <section className="flex-1">
              {loading && (
                <p className="text-center text-sm text-gray-400 mt-20">
                  메이트를 불러오는 중입니다...
                </p>
              )}

              {!loading && users.length === 0 && (
                <p className="text-center text-sm text-gray-400 mt-20">
                  검색 결과가 없습니다.
                </p>
              )}

              {!loading && users.length > 0 && (
                <div className="grid grid-cols-1 gap-6">
                  {users.map((user) => (
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
