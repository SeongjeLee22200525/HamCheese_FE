"use client";

import { useState } from "react";
import ReviewColumn from "./ReviewColumn";
import { PEER_REVIEW_VISIBLE_COUNT } from "@/constants/peerKeywords";

type KeywordItem = {
  key: string;
  count: number;
};

type Props = {
  name: string;
  goodKeywordCount: number;
  badKeywordCount: number;
  positive: KeywordItem[];
  negative: KeywordItem[];
};

export default function PeerReview({
  name,
  goodKeywordCount,
  badKeywordCount,
  positive,
  negative,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const visiblePositive = expanded
    ? positive
    : positive.slice(0, PEER_REVIEW_VISIBLE_COUNT);

  const visibleNegative = expanded
    ? negative
    : negative.slice(0, PEER_REVIEW_VISIBLE_COUNT);

  const hasMore =
    goodKeywordCount > PEER_REVIEW_VISIBLE_COUNT ||
    badKeywordCount > PEER_REVIEW_VISIBLE_COUNT;

  return (
    <section className="relative">
      {/* ===== 사다리꼴 탭 ===== */}
      <div className="profile-tab-wrap">
        <div className="profile-tab">
          <span className="profile-tab-text">동료평가</span>
        </div>
      </div>

      {/* ===== 내용 ===== */}
      <div className="bg-white rounded-b-lg rounded-tr-lg shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)] px-20 pt-17 pb-10">
        <div className="flex gap-16 text-[#222829] text-xl font-extrabold">
          <ReviewColumn
            type="positive"
            title={`${name}님의 강점`}
            subtitle={`${goodKeywordCount}명에게 동료평가를 받았어요.`}
            items={visiblePositive}
          />

          <ReviewColumn
            type="negative"
            title={`${name}님의 약점`}
            subtitle={`${badKeywordCount}명에게 동료평가를 받았어요.`}
            items={visibleNegative}
          />
        </div>
        {hasMore && (
          <div className="text-right">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-10 text-base text-[#495456] hover:text-[#00C3CC]"
            >
              {expanded ? "접기" : "더보기"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
