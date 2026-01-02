"use client";

import {
  POSITIVE_PEER_KEYWORDS,
  NEGATIVE_PEER_KEYWORDS,
} from "@/constants/peerKeywords";

type KeywordItem = {
  key: string;
  count: number;
};

type Props = {
  type: "positive" | "negative";
  title: string;
  subtitle: string;
  items: KeywordItem[];
};

// ===== 막대 길이 기준 =====
const MIN_COUNT = 1;
const MAX_COUNT = 14;
const MIN_WIDTH = 73;
const MAX_WIDTH = 450;

function getBarWidth(count: number) {
  const clamped = Math.min(Math.max(count, MIN_COUNT), MAX_COUNT);
  return (
    MIN_WIDTH +
    ((clamped - MIN_COUNT) / (MAX_COUNT - MIN_COUNT)) * (MAX_WIDTH - MIN_WIDTH)
  );
}

export default function ReviewColumn({ type, title, subtitle, items }: Props) {
  const keywordMap =
    type === "positive" ? POSITIVE_PEER_KEYWORDS : NEGATIVE_PEER_KEYWORDS;

  return (
    <div>
      {/* 제목 */}
      <div className="w-114 pb-3">
        <span className="font-extrabold pr-4 text-[#222829]">{title}</span>
        <span className="text-sm font-bold text-[#838F91]">{subtitle}</span>
      </div>

      {/* 내용 */}
      {items.length === 0 ? (
        <p className="text-xs text-[#8FAEB2]">아직 평가가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {items.map(({ key, count }) => {
            const keyword = keywordMap[key];
            if (!keyword) return null;

            const barWidth = getBarWidth(count);

            return (
              <li
                key={key}
                className="relative h-11 rounded bg-[#F5F8F8] px-5 flex items-center justify-between overflow-hidden"
              >
                {/* ===== 막대 ===== */}
                <div
                  className="absolute left-0 top-0 h-full bg-[#E0ECEE]"
                  style={{ width: `${barWidth}px` }}
                />

                {/* ===== 텍스트 (위에 올라오게) ===== */}
                <span className="relative z-10 flex items-center gap-2 text-base font-medium text-[#222829]">
                  <span>{keyword.emoji}</span>
                  {keyword.label}
                </span>

                <span className="relative z-10 text-base font-extrabold text-[#00C3CC]">
                  {count}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
