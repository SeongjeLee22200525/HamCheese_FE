"use client";

import { useState, useMemo } from "react";
import ReviewColumn from "./ReviewColumn";
import { PEER_REVIEW_VISIBLE_COUNT } from "@/constants/peerKeywords";

type KeywordItem = {
  key: string;
  count: number;
};

type SortType = "count" | "latest";

type Props = {
  name: string;
  peerGoodKeyword: Record<string, number>;
  goodKeywordCount: number;
  peerBadKeyword: Record<string, number>;
  badKeywordCount: number;
};

export default function PeerReview({
  name,
  peerGoodKeyword,
  goodKeywordCount,
  peerBadKeyword,
  badKeywordCount,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [sortType, setSortType] = useState<SortType>("count");

  /* ===== 정렬된 데이터 ===== */
  const positive: KeywordItem[] = useMemo(() => {
    const entries = Object.entries(peerGoodKeyword);

    const sorted =
      sortType === "count" ? [...entries].sort((a, b) => b[1] - a[1]) : entries; // 최신순 (서버 순서 유지)

    return sorted.map(([key, count]) => ({ key, count }));
  }, [peerGoodKeyword, sortType]);

  const negative: KeywordItem[] = useMemo(() => {
    const entries = Object.entries(peerBadKeyword);

    const sorted =
      sortType === "count" ? [...entries].sort((a, b) => b[1] - a[1]) : entries;

    return sorted.map(([key, count]) => ({ key, count }));
  }, [peerBadKeyword, sortType]);

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
    <section className="relative">
      {/* ===== 사다리꼴 탭 ===== */}
      <div className="profile-tab-wrap">
        <div className="profile-tab">
          <span className="profile-tab-text">동료평가</span>
        </div>
      </div>

      {/* ===== 내용 ===== */}
      <div className="bg-white rounded-b-lg rounded-tr-lg shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)] px-20 pt-10 pb-10">
        {/* ===== 드롭다운 ===== */}
        <div className="flex justify-end mb-12">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
            className="
      w-37 h-11.25
      outline-2 outline-[#E1EDF0]
      rounded py-3 px-3
      text-base font-medium text-[#495456]
      bg-white cursor-pointer
    "
          >
            <option value="count">많이 받은 순</option>
            <option value="latest">최신순</option>
          </select>
        </div>

        {/* ===== 컬럼 ===== */}
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

        {/* ===== 더보기 / 접기 ===== */}
        {hasMore && (
          <div className="text-right">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-10.75 text-base text-[#495456] hover:text-[#00C3CC]"
            >
              {expanded ? "접기" : "더보기"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
