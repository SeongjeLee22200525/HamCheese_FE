"use client";

import { useState, useMemo } from "react";
import ReviewColumn from "./ReviewColumn";
import { PEER_REVIEW_VISIBLE_COUNT } from "@/constants/peerKeywords";

type KeywordItem = {
  key: string; // 키워드 문자열
  count: number; // 받은 평가 수
};

type Props = {
  name: string;

  // 🔥 서버 response 그대로 받음
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

  // ===== 서버 데이터 → UI 데이터 변환 =====
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
