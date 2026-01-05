import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import RecruitingActions from "@/components/recruiting/RecruitingActions";

import { useUserStore } from "@/stores/useUserStore";
import { getRecruitingDetail } from "@/api/recruiting";
import { RecruitingDetail } from "@/types/recruitingDetail";
import { useRecruitingActions } from "@/hooks/useRecruitingActions";

/* 날짜 포맷 */
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
};

export default function RecruitMateDetail() {
  const router = useRouter();
  const { recruitingId } = router.query;
  const user = useUserStore((state) => state.user);

  const [recruiting, setRecruiting] =
    useState<RecruitingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  /* 수정 / 삭제 핸들러 */
  const { handleEdit, handleDelete } = useRecruitingActions(
    Number(recruitingId),
    user?.myId ?? 0
  );

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
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          {/* breadcrumb */}
          <div className="flex items-center text-sm text-[#838F91] mb-4">
            모집하기
            <img
              src="/images/Vector.svg"
              className="w-2 h-2 mx-2"
              alt=""
            />
            <span>{recruiting.projectType}</span>
          </div>

          {/* ================= 카드 ================= */}
          <div className="border border-[#E6EEF0] rounded-xl bg-white px-12 py-10">
            {/* ---------- 상단 ---------- */}
            <div className="flex mb-8">
              {/* 왼쪽 전체 영역 */}
              <div className="flex-1">
                {/* 모집 정보 */}
                <div className="flex items-center gap-2 text-m text-[#6B7280] mb-3">
                  <span className="px-3 py-2 rounded bg-[#F5F8F8] text-[#0FA4AB] font-bold">
                    모집인원 {recruiting.recruitPeople}/{recruiting.totalPeople}
                  </span>
                  <span className="text-[#B7C4C7] text-xl font-medium">|</span>
                  <span className="text-[#00AEB5] font-bold">
                    {recruiting.projectType}
                  </span>
                </div>

                {/* 제목 */}
                <h1 className="text-[22px] font-extrabold text-[#222829] mb-4">
                  {recruiting.title}
                </h1>

                {/* 작성자 영역 */}
                <div className="flex items-start gap-4">
                  <img
                    src={recruiting.imageUrl || "/images/profile.svg"}
                    alt="profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <div className="flex flex-col gap-2">
                    {/* 이름 + 정보 pill */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xl font-extrabold text-[#222829]">
                        {recruiting.name} 학부생
                      </span>

                      <span className="p-2 rounded bg-[#F5F8F8] text-[#838F91] font-semibold">
                        {recruiting.studentId}학번
                      </span>

                      <span className="p-2 rounded bg-[#F5F8F8] text-[#0FA4AB] font-semibold">
                        {recruiting.firstMajor}
                      </span>

                      {recruiting.secondMajor && (
                        <span className="px-4 py-2 rounded bg-[#F5F8F8] text-[#0FA4AB] font-semibold">
                          {recruiting.secondMajor}
                        </span>
                      )}
                    </div>

                    {/* 해시태그 */}
                    <div className="flex gap-2 flex-wrap">
                      {recruiting.myKeyword.map((k) => (
                        <span
                          key={k}
                          className="px-2 py-1 text-sm text-[#838F91] rounded border border-[#CEDBDE]"
                        >
                          #{k}
                        </span>
                      ))}
                    </div>

                    {/* 날짜 */}
                    <span className="text-base text-[#838F91]">
                      {formatDateTime(recruiting.date)}
                    </span>
                  </div>
                </div>

                {/* 수정 / 삭제 */}
                {recruiting.canEdit && (
                  <RecruitingActions
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>

              {/* 오른쪽 버튼 (본인 글 아닐 때) */}
              {!recruiting.canEdit && (
                <button className="ml-6 flex items-center gap-2 px-5 py-3 rounded-lg bg-[#6EC6CC] text-[#F5F8F8] font-extrabold h-fit">
                  <img
                    src="/images/chat.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  조각 건네기
                </button>
              )}
            </div>

            <hr className="border-[#E6EEF0] mb-8" />

            {/* ---------- 정보 박스 ---------- */}
            <div className="bg-[#F5F8F8] rounded-lg px-8 py-5 mb-10">
              <div className="grid grid-cols-[90px_1fr] gap-y-2">
                <span className="text-[#00AEB5] text-xl font-bold">과목</span>
                <span className="font-bold text-xl text-[#222829]">
                  {recruiting.projectSpecific}
                </span>

                <span className="text-[#00AEB5] text-xl font-bold">분반</span>
                <span className="font-bold text-xl text-[#222829]">
                  {recruiting.classes}분반
                </span>

                <span className="text-[#00AEB5] text-xl font-bold">주제</span>
                <span className="font-bold text-xl text-[#222829]">
                  {recruiting.topic}
                </span>
              </div>
            </div>

            {/* ---------- 본문 ---------- */}
            <div className="text-xl text-[#495456] leading-[1.9] whitespace-pre-line">
              {recruiting.context}
            </div>
          </div>

          {/* ================= 하단 버튼 ================= */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={() => router.push("/recruitmate/create")}
              className="px-8 py-3 rounded bg-[#6EC6CC] text-white font-extrabold"
            >
              모집글 쓰기
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/recruitmate")}
                className="px-5 py-3 rounded bg-[#E6EEF0] text-[#495456] font-extrabold"
              >
                목록
              </button>
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="px-5 py-3 rounded bg-[#E6EEF0] text-[#495456] font-extrabold"
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
