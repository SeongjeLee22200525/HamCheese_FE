"use client";

import { useMemo, useState } from "react";
import ReviewColumn from "./mateprofile/ReviewColumn";
import { PEER_REVIEW_VISIBLE_COUNT } from "@/constants/peerKeywords";

type KeywordItem = {
  key: string;
  count: number;
};

type Props = {
  name: string;
  peerGoodKeyword: Record<string, number>;
  goodKeywordCount: number;
  peerBadKeyword: Record<string, number>;
  badKeywordCount: number;
};

export default function ReviewByCount({
  name,
  peerGoodKeyword,
  goodKeywordCount,
  peerBadKeyword,
  badKeywordCount,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  /* ===== 데이터 정렬 ===== */
  const positive: KeywordItem[] = useMemo(
    () =>
      Object.entries(peerGoodKeyword)
        .sort((a, b) => b[1] - a[1])
        .map(([key, count]) => ({ key, count })),
    [peerGoodKeyword]
  );

  const negative: KeywordItem[] = useMemo(
    () =>
      Object.entries(peerBadKeyword)
        .sort((a, b) => b[1] - a[1])
        .map(([key, count]) => ({ key, count })),
    [peerBadKeyword]
  );

  /* ===== 노출 개수 제어 ===== */
  const visiblePositive = expanded
    ? positive
    : positive.slice(0, PEER_REVIEW_VISIBLE_COUNT);

  const visibleNegative = expanded
    ? negative
    : negative.slice(0, PEER_REVIEW_VISIBLE_COUNT);

  const hasMore =
    positive.length > PEER_REVIEW_VISIBLE_COUNT ||
    negative.length > PEER_REVIEW_VISIBLE_COUNT;

  return (
    <div>
      <div className="flex gap-16 text-xl font-extrabold text-[#222829]">
        <ReviewColumn
          type="positive"
          title={`${name}님의 강점`}
          subtitle={`${goodKeywordCount}건의 동료평가를 받았어요.`}
          items={visiblePositive}
        />

        <ReviewColumn
          type="negative"
          title={`${name}님의 약점`}
          subtitle={`${badKeywordCount}건의 동료평가를 받았어요.`}
          items={visibleNegative}
        />
      </div>

      {/* ===== 더보기 / 접기 ===== */}
      {hasMore && (
        <div className="text-right mt-0.75">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-10 text-base text-[#495456] hover:text-[#00C3CC]"
          >
            {expanded ? "접기" : "더보기"}
          </button>
        </div>
      )}
    </div>
  );
}
