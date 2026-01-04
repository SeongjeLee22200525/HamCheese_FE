import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import { useUserStore } from "@/stores/useUserStore";
import { getRecruitingDetail } from "@/api/recruiting";
import { RecruitingDetail } from "@/types/recruitingDetail";

export default function RecruitMateDetail() {
  const router = useRouter();
  const { recruitingId } = router.query;
  const user = useUserStore((state) => state.user);

  const [recruiting, setRecruiting] =
    useState<RecruitingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recruitingId || !user) return;

    const fetchDetail = async () => {
      try {
        const data = await getRecruitingDetail(
          Number(recruitingId),
          user.myId
        );
        setRecruiting(data);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [recruitingId, user]);

  /* ================= 로딩 / 에러 ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center text-[#9AA4A6]">
          로딩 중...
        </main>
        <Footer />
      </div>
    );
  }

  if (!recruiting) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center text-[#9AA4A6]">
          존재하지 않는 모집글입니다.
        </main>
        <Footer />
      </div>
    );
  }

  /* ================= 본문 ================= */

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-6 py-10">
          {/* breadcrumb */}
          <div className="flex items-center text-sm font-medium text-[#838F91] mb-3">
            모집하기
            <img
              src="/images/Vector.svg"
              className="w-2 h-2 mx-2"
              alt=""
            />
            {recruiting.projectType}
          </div>

          {/* ================= 전체 박스 ================= */}
          <div className="border border-[#E6EEF0] rounded-lg bg-white px-10 py-8">
            {/* 상단 영역 */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
                  <span className="px-2 py-1 rounded bg-[#EEF7F8] text-[#0FA4AB] font-semibold">
                    모집인원 {recruiting.recruitPeople}/
                    {recruiting.totalPeople}
                  </span>
                  <span className="text-[#00AEB5] font-semibold">
                    {recruiting.projectType}
                  </span>
                </div>

                <h1 className="text-xl font-extrabold mb-3 text-[#222829]">
                  {recruiting.title}
                </h1>

                <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <span>{recruiting.name} 학부생</span>
                  <span className="text-[#D1D5DB]">|</span>
                  <span>{recruiting.date}</span>
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                  {recruiting.myKeyword.map((k) => (
                    <span
                      key={k}
                      className="px-2 py-1 text-xs rounded border border-[#E6EEF0]"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </div>

              {/* 우측 버튼 */}
              {recruiting.canEdit ? (
                <div className="flex gap-4 text-sm text-[#6B7280]">
                  <button
                    onClick={() =>
                      router.push(`/recruitmate/edit/${recruitingId}`)
                    }
                  >
                    수정
                  </button>
                  <button className="text-red-500">삭제</button>
                </div>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#6EC6CC] text-[#222829] text-sm font-bold">
                  조직 건너기
                </button>
              )}
            </div>

            <hr className="my-8 border-[#E6EEF0]" />

            {/* 정보 박스 */}
            <div className="bg-[#F5F8F8] rounded px-6 py-4 text-sm mb-8">
              <div className="grid grid-cols-[80px_1fr] gap-y-2">
                <span className="text-[#00AEB5] font-bold">과목</span>
                <span className="text-[#222829] font-bold">
                  {recruiting.projectSpecific}
                </span>

                <span className="text-[#00AEB5] font-bold">분반</span>
                <span className="text-[#222829] font-bold">
                  {recruiting.classes}분반
                </span>

                <span className="text-[#00AEB5] font-bold">주제</span>
                <span className="text-[#222829] font-bold">
                  {recruiting.topic}
                </span>
              </div>
            </div>

            {/* 본문 */}
            <div className="text-sm text-[#495456] leading-relaxed whitespace-pre-line">
              {recruiting.context}
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => router.push("/recruitmate/create")}
              className="px-6 py-3 rounded bg-[#6EC6CC] text-white font-bold"
            >
              모집글 쓰기
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/recruitmate")}
                className="px-4 py-2 rounded bg-[#E6EEF0] text-[#495456] font-extrabold"
              >
                목록
              </button>
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="px-4 py-2 rounded bg-[#E6EEF0] text-[#495456] font-extrabold"
              >
                TOP
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
