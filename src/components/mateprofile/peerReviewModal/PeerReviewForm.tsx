"use client";

import { useMemo, useState } from "react";
import type { MetaTag } from "@/types/user";
import {
  POSITIVE_PEER_KEYWORDS,
  NEGATIVE_PEER_KEYWORDS,
} from "@/constants/peerKeywords";

export type PeerReviewSubmitPayload = {
  startedYear: string;
  startedMonth: string;
  meetWhere: string;
  goodKeys: string[]; // ✅ 키워드 문자열
  badKeys: string[]; // ✅ 키워드 문자열
};

type Props = {
  targetName: string;
  targetImageUrl?: string;
  targetMetaTags?: MetaTag[];
  onCancel: () => void;
  onSubmit: (payload: PeerReviewSubmitPayload) => void;
};

/* ===== Chip ===== */
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
      className={`h-11 px-5 rounded border text-base font-medium inline-flex items-center gap-3 text-[#222829]
        transition
        ${
          selected
            ? "border-[#00C3CC] bg-white shadow-[0_0_0_1px_#00C3CC] hover:bg-[#E1EDF0] active:bg-[#CEDBDE]"
            : "border-[#EEF2F3] bg-[#F5F8F8] hover:bg-[#E1EDF0] active:bg-[#CEDBDE]"
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

  const canSubmit = useMemo(() => {
    const yearValid = /^\d{4}$/.test(startedYear);
    const monthNum = Number(startedMonth);
    const monthValid = startedMonth !== "" && monthNum >= 1 && monthNum <= 12;

    return (
      yearValid &&
      monthValid &&
      meetWhere.trim() !== "" &&
      goodKeys.length >= 1 &&
      badKeys.length >= 1
    );
  }, [
    startedYear,
    startedMonth,
    meetWhere,
    goodKeys, // 추가
    badKeys, // 추가
  ]);

  const isValidState = (good: number, bad: number, totalLimit: number) => {
    return good >= 1 && bad >= 1 && good + bad <= totalLimit;
  };

  const toggleWithTotalLimit = (
    targetArr: string[],
    otherArr: string[],
    key: string,
    totalLimit: number
  ) => {
    // 이미 선택된 경우 → 해제
    if (targetArr.includes(key)) {
      return targetArr.filter((k) => k !== key);
    }

    // 총합 10개 초과 방지
    if (targetArr.length + otherArr.length >= totalLimit) {
      return targetArr;
    }

    // 추가
    return [...targetArr, key];
  };

  /* ===== constants → 렌더링용 배열 ===== */
  const GOOD_OPTIONS = useMemo(
    () =>
      Object.entries(POSITIVE_PEER_KEYWORDS).map(([key, meta]) => ({
        key, // 서버로 보낼 값
        label: key, // 화면에 보여줄 문장 ✅
        emoji: meta.emoji,
      })),
    []
  );

  const BAD_OPTIONS = useMemo(
    () =>
      Object.entries(NEGATIVE_PEER_KEYWORDS).map(([key, meta]) => ({
        key,
        label: key,
        emoji: meta.emoji,
      })),
    []
  );

  return (
    <div className="pl-[95px] pr-40 pt-25 ">
      <div className="flex flex-col h-[78vh]">
        {/* ================= 스크롤 영역 ================= */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* 상단 프로필 */}
          <div className="flex items-center gap-8 mb-15">
            <div className="w-[110px] h-[110px] rounded-full bg-[#D6E1E3] overflow-hidden">
              <img
                src={targetImageUrl || "/images/default-profile.png"}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>

            <div>
              <div className="text-2xl font-extrabold text-[#222829]">
                {targetName} 학부생의 동료평가 남기기 (총 10개)
              </div>
              <div className="flex gap-1 mt-2 flex-wrap text-xs font-semibold">
                {targetMetaTags.map((tag, idx) => (
                  <span
                    key={`${tag.type}-${idx}`}
                    className={`px-2 py-2 rounded bg-[#F5F8F8]
                      ${
                        tag.type === "studentId"
                          ? "text-[#838F91]"
                          : "text-[#0FA4AB]"
                      }`}
                  >
                    {tag.value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 프로젝트 시작 시점 */}
          <div className="flex items-start mb-8">
            <p className="w-[250px] text-xl font-extrabold text-[#222829] mt-4">
              언제 프로젝트가 시작되었나요?
            </p>

            <div className="flex items-center pl-13 gap-8">
              <div className="flex items-center gap-3">
                <input
                  value={startedYear}
                  onChange={(e) => setStartedYear(e.target.value)}
                  className="w-20 h-[58px] px-4 border-2 border-[#E1EDF0] rounded font-medium
                             text-[#495456] focus:border-[#00C3CC] focus:outline-none"
                  placeholder="2026"
                />
                <span className="font-semibold text-[#495456]">년</span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  value={startedMonth}
                  onChange={(e) => {
                    // 숫자만 입력 허용
                    const v = e.target.value.replace(/\D/g, "");
                    setStartedMonth(v);
                  }}
                  onBlur={() => {
                    if (startedMonth === "") return;

                    const monthNum = Number(startedMonth);
                    if (monthNum >= 1 && monthNum <= 12) {
                      // 🔥 여기서 2자리로 보정
                      setStartedMonth(String(monthNum).padStart(2, "0"));
                    }
                  }}
                  className="w-20 h-[58px] px-4 border-2 border-[#E1EDF0] rounded font-medium
             text-[#495456] focus:border-[#00C3CC] focus:outline-none placeholder:text-[#CEDBDE]"
                  placeholder="MM"
                />

                <span className="font-semibold text-[#495456]">월</span>
              </div>
            </div>
          </div>

          {/* 만난 곳 */}
          <div className="flex items-start mb-15">
            <p className="w-[250px] text-xl font-extrabold text-[#222829] mt-4">
              어디에서 이 분을 만났나요?
            </p>

            <div className="flex items-center pl-13">
              <input
                value={meetWhere}
                onChange={(e) => setMeetWhere(e.target.value)}
                className="w-[450px] h-[58px] px-4 border-2 border-[#E1EDF0] rounded font-medium
                           text-[#495456] focus:border-[#00C3CC] focus:outline-none placeholder:text-[#CEDBDE]"
                placeholder="과목을 입력하세요. ex) 전산 캠스톤"
              />
            </div>
          </div>

          {/* GOOD */}
          <div className="mb-20">
            <p className="font-extrabold text-xl mb-5 text-[#222829]">
              이런 면이 좋았어요{" "}
              <span className="pl-3 font-medium ">(최소 1개 선택)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {GOOD_OPTIONS.map((o) => (
                <Chip
                  key={o.key}
                  emoji={o.emoji}
                  label={o.label}
                  selected={goodKeys.includes(o.key)}
                  onClick={() =>
                    setGoodKeys(
                      toggleWithTotalLimit(goodKeys, badKeys, o.key, 10)
                    )
                  }
                />
              ))}
            </div>
          </div>

          {/* BAD */}
          <div className="mb-30">
            <p className="font-extrabold text-xl mb-5 text-[#222829]">
              이런 면이 아쉬웠어요{" "}
              <span className="pl-3 font-medium">(최소 1개 선택)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {BAD_OPTIONS.map((o) => (
                <Chip
                  key={o.key}
                  emoji={o.emoji}
                  label={o.label}
                  selected={badKeys.includes(o.key)}
                  onClick={() =>
                    setBadKeys(
                      toggleWithTotalLimit(badKeys, goodKeys, o.key, 10)
                    )
                  }
                />
              ))}
            </div>
          </div>
          {/* ================= 하단 버튼 ================= */}
          <div className=" bg-white">
            <div className="flex justify-center gap-6 pb-25">
              <button
                onClick={onCancel}
                className="w-[280px] h-14 rounded-md font-extrabold bg-[#E8EFF1] text-[#495456] hover:bg-[#DDE7EA] "
              >
                취소
              </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
