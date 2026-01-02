"use client";

import { useState } from "react";

export type PeerReviewItem = {
  label: string;
  count: number;
};

type Props = {
  positive: PeerReviewItem[];
  negative: PeerReviewItem[];
};

const DEFAULT_VISIBLE_COUNT = 3;

export default function PeerReview({ positive, negative }: Props) {
  const [expanded, setExpanded] = useState(false);

  const visiblePositive = expanded
    ? positive
    : positive.slice(0, DEFAULT_VISIBLE_COUNT);

  const visibleNegative = expanded
    ? negative
    : negative.slice(0, DEFAULT_VISIBLE_COUNT);

  const hasMore =
    positive.length > DEFAULT_VISIBLE_COUNT ||
    negative.length > DEFAULT_VISIBLE_COUNT;

  return (
    <section className="relative">
      {/* ===== 사다리꼴 탭 ===== */}
      <div className="profile-tab-wrap">
        <div className="profile-tab">
          <span className="profile-tab-text">동료평가</span>
        </div>
      </div>

      {/* ===== 내용 박스 ===== */}
      <div className="bg-white rounded-b-lg rounded-tr-lg shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)] px-20 py-17">
        <div className="grid grid-cols-2 gap-16">
          {/* ===== 긍정 ===== */}
          <ReviewColumn
            title="서예진님의 강점"
            subtitle={`${positive.length}명이 동료평가를 남겼어요.`}
            items={visiblePositive}
          />

          {/* ===== 부정 ===== */}
          <ReviewColumn
            title="서예진님의 약점"
            subtitle={`${negative.length}명이 동료평가를 남겼어요.`}
            items={visibleNegative}
          />
        </div>

        {/* ===== 더보기 / 접기 ===== */}
        {hasMore && (
          <div className="mt-10 text-right">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-sm text-[#8FAEB2] hover:text-[#222829] transition"
            >
              {expanded ? "접기" : "더보기"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===== 내부 전용 컴포넌트 ===== */

function ReviewColumn({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: PeerReviewItem[];
}) {
  return (
    <div>
      <div className="mb-5">
        <h4 className="font-extrabold text-[#222829]">{title}</h4>
        <p className="text-xs text-[#8FAEB2] mt-1">{subtitle}</p>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-[#8FAEB2]">아직 평가가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between bg-[#EAF1F2] rounded px-4 py-2"
            >
              <span className="text-sm text-[#222829]">{item.label}</span>
              <span className="text-sm font-extrabold text-[#00C3CC]">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
