"use client";

import { useMemo, useState } from "react";

export type PeerReviewSubmitPayload = {
  startedYear: string;
  startedMonth: string;
  meetWhere: string;
  goodKeys: string[];
  badKeys: string[];
};

type Props = {
  targetName: string;
  targetImageUrl?: string;
  targetMetaTags?: string[];
  onCancel: () => void;
  onSubmit: (payload: PeerReviewSubmitPayload) => void;
};

/* ===== 임시 키워드 (나중에 constants로 교체 가능) ===== */
const GOOD_OPTIONS = [
  { key: "GOOD_PLANNING", label: "자료조사를 꼼꼼하게 해요", emoji: "🔍" },
  { key: "ORGANIZE", label: "내용을 한눈에 보이게 정리해요", emoji: "😄" },
  { key: "DOC", label: "문서 가독성을 잘 신경 써요", emoji: "📘" },
  { key: "RECORD", label: "기록을 잘 남겨요", emoji: "✏️" },
  { key: "PPT", label: "PPT를 잘 만들어요", emoji: "📊" },
  { key: "PRESENT", label: "발표 전달력이 좋아요", emoji: "🎤" },
  { key: "CONTACT", label: "연락이 잘 돼요", emoji: "📱" },
  { key: "RESPECT", label: "팀원 의견을 존중해요", emoji: "🤝" },
  { key: "SCHEDULE", label: "팀 일정 관리를 잘 해요", emoji: "📅" },
];

const BAD_OPTIONS = [
  { key: "LACK_RESEARCH", label: "자료조사가 부족해요", emoji: "🔍" },
  { key: "MESSY", label: "자료 정리가 잘 안 돼 있어요", emoji: "😅" },
  { key: "DOC_HARD", label: "공유 문서 이해가 어려워요", emoji: "📄" },
  { key: "NO_RECORD", label: "기록을 잘 남기지 않아요", emoji: "✏️" },
  { key: "PPT_LOW", label: "PPT 완성도가 낮아요", emoji: "📊" },
  { key: "CONTACT_BAD", label: "연락이 잘 안 돼요", emoji: "📵" },
  { key: "SCHEDULE_BAD", label: "팀 일정 관리가 아쉬워요", emoji: "📅" },
];

/* ===== 칩 컴포넌트 ===== */
function Chip({
  selected,
  onClick,
  emoji,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 px-4 rounded-lg border text-sm font-bold inline-flex items-center gap-2
        transition
        ${
          selected
            ? "border-[#00C3CC] bg-white text-[#222829] shadow-[0_0_0_1px_#00C3CC]"
            : "border-[#EEF2F3] bg-[#F5F8F8] text-[#495456] hover:bg-[#EEF2F3]"
        }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}

export default function PeerReviewForm({
  targetName,
  targetImageUrl,
  targetMetaTags = [],
  onCancel,
  onSubmit,
}: Props) {
  const [startedYear, setStartedYear] = useState("2026");
  const [startedMonth, setStartedMonth] = useState("");
  const [meetWhere, setMeetWhere] = useState("");
  const [goodKeys, setGoodKeys] = useState<string[]>([]);
  const [badKeys, setBadKeys] = useState<string[]>([]);

  const canSubmit = useMemo(
    () => startedYear.trim() !== "" && meetWhere.trim() !== "",
    [startedYear, meetWhere]
  );

  const toggle = (arr: string[], key: string) =>
    arr.includes(key) ? arr.filter((k) => k !== key) : [...arr, key];

  return (
    <div className="pl-[95px] pr-40 pt-25">
      {/* ===== 모달 카드 내부 레이아웃 ===== */}
      <div className="flex flex-col h-[78vh]">
        {/* ================= 스크롤 영역 ================= */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* 상단 프로필 */}
          <div className="flex items-center gap-8 mb-10">
            <div className="w-[110px] h-[110px] rounded-full bg-[#D6E1E3] overflow-hidden">
              <img
                src={targetImageUrl || "/images/default-profile.png"}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>

            <div>
              <div className="text-2xl font-extrabold text-[#222829]">
                {targetName} 학부생의 동료평가 남기기
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {targetMetaTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-2 rounded bg-[#F5F8F8] text-[#0FA4AB] text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 프로젝트 시작 시점 */}
          <div className="grid grid-cols-[260px_1fr] gap-8 mb-6">
            <p className="text-lg font-extrabold">
              언제 프로젝트가 시작되었나요?
            </p>
            <div className="flex gap-4">
              <input
                value={startedYear}
                onChange={(e) => setStartedYear(e.target.value)}
                className="w-20 h-12 px-4 border rounded-md font-bold"
                placeholder="2025"
              />
              <input
                value={startedMonth}
                onChange={(e) => setStartedMonth(e.target.value)}
                className="w-20 h-12 px-4 border rounded-md font-bold"
                placeholder="MM"
              />
            </div>
          </div>

          {/* 만난 곳 */}
          <div className="">
            <span className="text-lg font-extrabold">어디에서 이 분을 만났나요?</span>
            <input
              value={meetWhere}
              onChange={(e) => setMeetWhere(e.target.value)}
              className="h-12 px-4 border rounded-md font-bold"
              placeholder="과목을 입력하세요. ex) 전산 캠스톤"
            />
          </div>

          {/* GOOD */}
          <div className="mb-8">
            <p className="font-extrabold mb-3">
              이런 면이 좋았어요 <span className="text-sm">(복수 선택)</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {GOOD_OPTIONS.map((o) => (
                <Chip
                  key={o.key}
                  emoji={o.emoji}
                  label={o.label}
                  selected={goodKeys.includes(o.key)}
                  onClick={() => setGoodKeys(toggle(goodKeys, o.key))}
                />
              ))}
            </div>
          </div>

          {/* BAD */}
          <div className="mb-12">
            <p className="font-extrabold mb-3">
              이런 면이 아쉬웠어요 <span className="text-sm">(복수 선택)</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {BAD_OPTIONS.map((o) => (
                <Chip
                  key={o.key}
                  emoji={o.emoji}
                  label={o.label}
                  selected={badKeys.includes(o.key)}
                  onClick={() => setBadKeys(toggle(badKeys, o.key))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= 하단 버튼 (고정) ================= */}
        <div className="pt-8 bg-white">
          <div className="flex justify-center gap-6">
            <button
              disabled={!canSubmit}
              onClick={() =>
                onSubmit({
                  startedYear,
                  startedMonth,
                  meetWhere,
                  goodKeys,
                  badKeys,
                })
              }
              className={`w-[280px] h-14 rounded-md font-extrabold
                ${
                  canSubmit
                    ? "bg-[#00C3CC] text-white hover:bg-[#00B2BA]"
                    : "bg-[#D6E1E3] text-white cursor-not-allowed"
                }`}
            >
              평가완료
            </button>

            <button
              onClick={onCancel}
              className="w-[280px] h-14 rounded-md font-extrabold bg-[#E8EFF1] text-[#495456] hover:bg-[#DDE7EA]"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
