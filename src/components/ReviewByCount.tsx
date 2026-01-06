"use client";

import { useMemo } from "react";
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

  return (
    <div className="flex gap-16 text-xl font-extrabold text-[#222829]">
      <ReviewColumn
        type="positive"
        title={`${name}님의 강점`}
        subtitle={`${goodKeywordCount}명에게 동료평가를 받았어요.`}
        items={positive.slice(0, PEER_REVIEW_VISIBLE_COUNT)}
      />

      <ReviewColumn
        type="negative"
        title={`${name}님의 약점`}
        subtitle={`${badKeywordCount}명에게 동료평가를 받았어요.`}
        items={negative.slice(0, PEER_REVIEW_VISIBLE_COUNT)}
      />
    </div>
  );
}
