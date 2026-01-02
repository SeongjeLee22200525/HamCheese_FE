import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { DEPARTMENTS } from "@/constants/departments";
import { UserProfile } from "@/types/user";

export default function SearchMate() {
  const [selected, setSelected] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  /* 학부 토글 */
  const toggleDept = (dept: string) => {
    setSelected((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  /* API 호출 */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", "10");

        if (selected.length > 0) {
          params.append("departments", selected.join(","));
        }
        if (keyword.trim()) {
          params.append("name", keyword.trim());
        }

        const url =
          selected.length > 0 || keyword.trim()
            ? `/user/filter?${params.toString()}`
            : `/user/findAll?${params.toString()}`;

        const res = await fetch(url);
        const data: UserProfile[] = await res.json();

        // 🔥 첫 페이지면 덮어쓰기, 아니면 이어붙이기
        setUsers((prev) => (page === 0 ? data : [...prev, ...data]));

        // 🔥 10개보다 적게 왔으면 더 없음
        setHasMore(data.length === 10);
      } catch (e) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selected, keyword, page]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-10 py-12">
          {/* 🔍 검색바 */}
          <SearchBar
            value={keyword}
            onChange={setKeyword}
            placeholder="원하는 메이트의 이름을 검색해보세요."
            title={
              <>
                팀원으로 적합한 <span className="text-[#00C3CC]">메이트</span>를
                찾아보세요!
              </>
            }
          />

          <div className="flex gap-10 mt-10">
            {/* 왼쪽: 학부 필터*/}
            <aside className="w-[260px] bg-white rounded-xl border border-[#6EC6CC] overflow-hidden sticky top-24">
              <div className="bg-[#6EC6CC] px-5 py-4">
                <h3 className="text-sm font-semibold text-white">
                  학부별 필터
                </h3>
              </div>

              <div className="mt-5 flex flex-col mb-5">
                {DEPARTMENTS.map((dept) => {
                  const checked = selected.includes(dept);

                  return (
                    <label
                      key={dept}
                      className="
                        w-full h-12 px-8
                        flex items-center gap-4
                        cursor-pointer select-none
                        hover:bg-[#F5F8F8]
                        active:bg-[#E1EDF0]
                      "
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleDept(dept)}
                      />

                      <div
                        className="
                          w-5 h-5
                          rounded-[4px]
                          border-2
                          flex items-center justify-center
                        "
                        style={{
                          borderColor: checked ? "#6EC6CC" : "#9AA4A6",
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-[2px]"
                          style={{
                            backgroundColor: checked
                              ? "#6EC6CC"
                              : "transparent",
                          }}
                        />
                      </div>

                      <span className="text-base font-medium text-[#222829]">
                        {dept}
                      </span>
                    </label>
                  );
                })}
              </div>
            </aside>

            {/* 오른쪽: 결과 영역 */}
            <section className="flex-1">
              {loading && (
                <p className="text-center text-sm text-gray-400 mt-20">
                  메이트를 불러오는 중입니다...
                </p>
              )}

              {error && (
                <p className="text-center text-sm text-red-500 mt-20">
                  {error}
                </p>
              )}

              {!loading && !error && users.length === 0 && (
                <p className="text-center text-sm text-gray-400 mt-20">
                  검색 결과가 없습니다.
                </p>
              )}

              {!loading && users.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {users.map((user) => (
                    <ProfileCard key={user.userId} user={user} />
                  ))}
                </div>
              )}
              {hasMore && !loading && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="
        px-6 py-2
        rounded-lg
        border border-[#6EC6CC]
        text-[#6EC6CC]
        hover:bg-[#F5F8F8]
      "
                  >
                    더보기
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
