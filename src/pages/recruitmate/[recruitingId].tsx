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
  const user = useUserStore(state => state.user);

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1000px] mx-auto px-10 py-12">
          <div className="border border-[#E6EEF0] rounded-xl px-10 py-8 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <span className="px-3 py-1 rounded bg-[#EEF7F8] text-[#0FA4AB] font-semibold">
                  모집인원 {recruiting.recruitPeople} /{" "}
                  {recruiting.totalPeople}
                </span>

                <span className="text-[#00AEB5] font-semibold">
                  {recruiting.projectType}
                </span>

                <img src="/images/Vector.svg" className="w-3 h-3" />

                <span>
                  {recruiting.projectSpecific}{" "}
                  {recruiting.classes}분반
                </span>
              </div>

              {/* 🔴 여기서 분기 */}
              {recruiting.canEdit ? (
                <div className="flex gap-4 text-sm text-[#6B7280]">
                  <button
                    onClick={() =>
                      router.push(
                        `/recruitmate/edit/${recruitingId}`
                      )
                    }
                  >
                    수정
                  </button>
                  <button className="text-red-500">
                    삭제
                  </button>
                </div>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#6EC6CC] text-white text-sm font-bold">
                  참여 문의하기
                </button>
              )}
            </div>

            <h1 className="text-2xl font-extrabold mb-6">
              {recruiting.title}
            </h1>

            <div className="mb-8 text-[#495456]">
              {recruiting.name} 학부생 · {recruiting.date}
            </div>

            <div className="flex gap-2 mb-8">
              {recruiting.myKeyword.map(k => (
                <span
                  key={k}
                  className="px-2 py-1 text-xs rounded border"
                >
                  #{k}
                </span>
              ))}
            </div>

            <div className="bg-[#F9FAFB] rounded-lg px-6 py-6 text-sm leading-relaxed">
              모집 상세 설명 영역
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
