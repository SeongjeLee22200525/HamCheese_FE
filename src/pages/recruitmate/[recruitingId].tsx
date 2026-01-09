import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "@/components/common/Snackbar";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import RecruitingActions from "@/components/recruiting/RecruitingActions";
import { Recruiting } from "@/types/recruiting";
import { getRecruitings } from "@/api/recruiting";

import { useUserStore } from "@/stores/useUserStore";
import { getRecruitingDetail } from "@/api/recruiting";
import { RecruitingDetail } from "@/types/recruitingDetail";
import { useRecruitingActions } from "@/hooks/useRecruitingActions";
import { sendPokingInRecruiting, checkCanPokeInRecruiting } from "@/api/poking";
import RecruitingCard from "@/components/recruiting/RecruitingCard";

import ConfirmModal from "@/components/common/ConfirmModal";

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
  const [relatedRecruitings, setRelatedRecruitings] = useState<Recruiting[]>(
    []
  );
  const router = useRouter();
  const { recruitingId } = router.query;
  const user = useUserStore((state) => state.user);

  const [recruiting, setRecruiting] = useState<RecruitingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 조각건네기 관련
  const [showPokingSuccess, setShowPokingSuccess] = useState(false);
  const [showAlreadyPoked, setShowAlreadyPoked] = useState(false);
  //모집글 삭제 모달 상태관리
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /* 수정 / 삭제 핸들러 */
  const { handleEdit, handleDelete } = useRecruitingActions(
    Number(recruitingId),
    user?.myId ?? 0
  );
  //수정후 스낵바
  const [showEditSnackbar, setShowEditSnackbar] = useState(false);

  useEffect(() => {
    const edit = sessionStorage.getItem("recruitingEdit");

    if (edit === "true") {
      setShowEditSnackbar(true);
      sessionStorage.removeItem("recruitingEdit");
    }
  }, []);

  useEffect(() => {
    if (!recruitingId || !user) return;

    const fetchDetail = async () => {
      try {
        const data = await getRecruitingDetail(Number(recruitingId), user.myId);
        setRecruiting(data);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [recruitingId, user]);

  useEffect(() => {
  if (!recruitingId || !user) return;

  const fetchRelatedRecruitings = async () => {
    try {
      const res = await getRecruitings({
        page: 0,
        size: 9999, // 의미 없음 (서버가 무시함)
      });

      const filtered = res
        // 🔥 현재 보고 있는 글 제외
        .filter(
          (item: Recruiting) => item.recruitingId !== Number(recruitingId)
        )
        // 🔥 여기서 5개만 사용
        .slice(0, 5);

      setRelatedRecruitings(filtered);
    } catch (e) {
      console.error("❌ 하단 모집글 불러오기 실패", e);
    }
  };

  fetchRelatedRecruitings();
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
        <div className="max-w-360 mx-auto px-6 py-10">
          {/* breadcrumb */}
          <div className="flex items-center text-m text-[#838F91] mb-4">
            모집하기
            <img src="/images/Vector.svg" className="w-3 h-3 mx-2" alt="" />
            <span>{recruiting.projectType}</span>
          </div>

          {/* ================= 카드 ================= */}
          <div className="border border-[#E6EEF0] rounded-xl bg-white px-20 pt-17 pb-25">
            {/* ---------- 상단 ---------- */}
            <div className="flex mb-10">
              {/* 왼쪽 전체 영역 */}
              <div className="flex-1">
                {/* 모집 정보 */}
                <div className="flex items-center gap-2 text-m text-[#6B7280] mb-3">
                  <span className="px-3 py-2 rounded bg-[#F5F8F8] text-[#0FA4AB] font-bold">
                    모집인원 {recruiting.totalPeople - recruiting.recruitPeople}/{recruiting.totalPeople}
                  </span>
                  <span className="text-[#B7C4C7] text-xl font-medium">|</span>
                  <span className="text-[#00AEB5] font-bold">
                    {recruiting.projectType}
                  </span>
                </div>

                {/* 제목 */}
                <h1 className="text-[22px] font-bold text-[#222829] mb-4">
                  {recruiting.title}
                </h1>

                {/* ================= 작성자 영역 ================= */}
                <div className="flex justify-between items-end w-full">
                  {/* ⬅️ 왼쪽 영역 */}
                  <div className="flex items-start gap-4">
                    {/* 프로필 이미지 */}
                    <img
                      src={recruiting.imageUrl || "/images/profile.svg"}
                      alt="profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    {/* 정보 영역 */}
                    <div className="flex flex-col gap-4">
                      {/* 이름 + 전공 */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-lg font-bold text-[#222829]">
                            {recruiting.name} 학부생
                          </span>

                          <span className="px-3 py-1.5 rounded bg-[#F5F8F8] text-[#838F91] font-semibold">
                            {recruiting.studentId}학번
                          </span>

                          <span className="px-3 py-1.5 rounded bg-[#F5F8F8] text-[#0FA4AB] font-semibold">
                            {recruiting.firstMajor}
                          </span>

                          {recruiting.secondMajor && (
                            <span className="px-3 py-1.5 rounded bg-[#F5F8F8] text-[#0FA4AB] font-semibold">
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
                      </div>

                      {/* ✅ 시간 (왼쪽 컬럼 맨 아래) */}
                      <div className="text-[#838F91] text-base">
                        {formatDateTime(recruiting.date)}
                      </div>
                    </div>
                  </div>

                  {/* ➡️ 오른쪽 영역 */}
                  <div>
                    {recruiting.canEdit ? (
                      /* ✅ 내 글: 수정 / 삭제 */
                      <RecruitingActions
                        onEdit={handleEdit}
                        onDelete={() => setShowDeleteConfirm(true)}
                      />
                    ) : (
                      /* ✅ 남의 글: 안내 문구 + 버튼 */
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right text-[#1A858A] text-sm font-semibold">
                          팀원으로 고민중이신가요?
                          <br />한 번 대화해보세요!
                        </div>

                        <button
                          onClick={async () => {
                            if (!user?.myId || !recruitingId) return;

                            const myId = user.myId;
                            const rid = Number(recruitingId);
                            if (Number.isNaN(rid)) return;

                            try {
                              const { canPoke } =
                                await checkCanPokeInRecruiting(rid, myId);

                              if (!canPoke) {
                                setShowAlreadyPoked(true);
                                return;
                              }

                              await sendPokingInRecruiting(rid, myId);
                              setShowPokingSuccess(true);
                            } catch {
                              setShowAlreadyPoked(true);
                            }
                          }}
                          className="
            flex items-center gap-2
            pl-3 pr-4 py-2.5
            rounded-lg
            bg-[#00C3CC]
            text-[#F5F8F8]
            font-bold
            hover:bg-[#0FA4AB]
            active:bg-[#1A858A]
          "
                        >
                          <img
                            src="/images/poke.svg"
                            alt=""
                            className="w-7 h-7"
                          />
                          메이트 체크!
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {showEditSnackbar && (
                  <Snackbar
                    message="글이 수정되었습니다."
                    onClose={() => setShowEditSnackbar(false)}
                  />
                )}
              </div>
            </div>

            <hr className="border-[#E6EEF0] mb-8" />

            {/* ---------- 정보 박스 ---------- */}
            <div className="bg-[#F5F8F8] rounded-lg px-8 py-5 mb-10">
              <div className="grid grid-cols-[90px_1fr] gap-y-2">
                {/* 첫 번째 줄: 과목 / 활동명 / 대회명 */}
                <span className="text-[#00AEB5] text-xl font-bold">
                  {recruiting.projectType === "동아리/학회"
                    ? "활동명"
                    : recruiting.projectType === "대회"
                    ? "대회명"
                    : "과목"}
                </span>

                <span className="font-bold text-xl text-[#222829]">
                  {recruiting.projectSpecific}
                </span>

                {/* 두 번째 줄: 분반 / 지도교수 / 모집파트 */}
                <span className="text-[#00AEB5] text-xl font-bold">
                  {recruiting.projectType === "수업"
                    ? "분반"
                    : recruiting.projectType === "졸업작품"
                    ? "지도교수"
                    : "모집파트"}
                </span>

                <span className="font-bold text-xl text-[#222829]">
                  {recruiting.projectType === "수업"
                    ? `${recruiting.classes}분반`
                    : recruiting.classes}
                </span>

                {/* 주제 (공통) */}
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
              className="w-60 h-14 rounded bg-[#00C3CC] text-[#F5F8F8] text-lg font-bold hover:bg-[#0FA4AB] active:bg-[#1A858A]"
            >
              모집글 쓰기
            </button>
          </div>
          {/* ================= 하단 모집글 리스트 ================= */}
          <section className="mt-20">
            <h2 className="text-lg font-bold text-[#222829] mb-6">전체글</h2>

            <div className="flex flex-col border-t border-Neutral_gray2">
              {relatedRecruitings.map((item) => (
                <div
                  key={item.recruitingId}
                  onClick={() =>
                    router.push(`/recruitmate/${item.recruitingId}`)
                  }
                  className="
        px-10 py-4
        border-b border-Neutral_gray2
        bg-white
        flex items-center gap-14
        cursor-pointer
        hover:bg-[#F5F8F8]
        transition
      "
                >
                  {/* 왼쪽 */}
                  <div className="flex-1 flex items-center gap-5">
                    {/* 모집인원 + 타입 */}
                    <div className="w-60 flex items-center gap-4">
                      <div className="px-3 py-1.5 bg-[#F5F8F8] rounded">
                        <span className="text-sm font-bold text-[#6B7280]">
                          모집인원 {item.recruitPeople}
                        </span>
                        <span className="mx-1 text-sm text-[#6B7280]">/</span>
                        <span className="text-sm font-bold text-[#6B7280]">
                          {item.totalPeople}
                        </span>
                      </div>

                      <div className="text-[#00AEB5] font-bold text-base">
                        {item.projectType}
                      </div>
                    </div>

                    {/* 제목 */}
                    <div className="flex-1 text-[#222829] text-base font-medium truncate">
                      {item.title}
                    </div>
                  </div>

                  {/* 작성자 */}
                  <div className="w-32 text-center text-sm font-medium text-[#222829]">
                    {item.name} 학부생
                  </div>

                  {/* 날짜 */}
                  <div className="w-20 text-right text-sm text-[#9AA4A6]">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {showPokingSuccess && (
        <Snackbar
          message={`상대방을 찔렀어요!\n상대가 수락하면 대화를 시작할 수 있어요.`}
          actionText="확인"
          duration={3000}
          onClose={() => setShowPokingSuccess(false)}
        />
      )}

      {showAlreadyPoked && (
        <Snackbar
          message="이미 이 모집글 작성자를 찔렀어요!"
          actionText="확인"
          duration={3000}
          onClose={() => setShowAlreadyPoked(false)}
        />
      )}
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

      {showDeleteConfirm && (
        <ConfirmModal
          title={`정말로 삭제하시겠습니까?\n삭제하면 복구할 수 없어요.`}
          cancelText="취소"
          confirmText="삭제하기"
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            setShowDeleteConfirm(false);
            handleDelete(); // 🔥 여기서 실제 삭제
          }}
        />
      )}

      <Footer />
    </div>
  );
}
