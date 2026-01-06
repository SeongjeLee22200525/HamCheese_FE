"use client";

import {
  POSITIVE_PEER_KEYWORDS,
  NEGATIVE_PEER_KEYWORDS,
} from "@/constants/peerKeywords";

type Props = {
  peerReviewRecent: {
    startDate: string; // "2026-02"
    meetSpecific: string;
    goodKeywordList: string[];
    badKeywordList: string[];
  }[];
};

/* 🔥 날짜 포맷: 2026-02 → 2026.02 */
const formatYearMonth = (value: string) => {
  const [year, month] = value.split("-");
  if (!year || !month) return value;
  return `${year}.${month}`;
};

/* 🔥 키워드 → 이모지 */
const getEmoji = (keyword: string, type: "positive" | "negative") => {
  if (type === "positive") {
    return POSITIVE_PEER_KEYWORDS[keyword]?.emoji ?? "";
  }
  return NEGATIVE_PEER_KEYWORDS[keyword]?.emoji ?? "";
};

export default function ReviewByTime({ peerReviewRecent }: Props) {
  if (peerReviewRecent.length === 0) {
    return (
      <p className="text-sm text-[#838F91]">아직 받은 동료평가가 없습니다.</p>
    );
  }

  return (
    <div className="">
      {peerReviewRecent.map((review, idx) => (
        <div key={idx}>
          {/* 날짜 + 만난 곳 */}
          <div className="flex mb-5">
            <div className="w-14 pt-1 h-4.25 text-sm font-medium text-[#838F91]">
              {formatYearMonth(review.startDate)}
            </div>
            <div className="ml-4 text-lg font-bold text-[#222829]">
              {review.meetSpecific}
            </div>
          </div>

          {/* 좋은 점 */}
          {review.goodKeywordList.length > 0 && (
            <div className="ml-16.75 pb-5 text-[#222829]">
              <p className="font-medium text-base mb-2">강점 키워드</p>
              <div className="flex flex-wrap">
                {review.goodKeywordList.map((k) => (
                  <span
                    key={k}
                    className="h-11 px-5 py-3.25 rounded text-sm bg-[#F5F8F8] mr-3 mb-2"
                  >
                    {getEmoji(k, "positive")} {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 아쉬운 점 */}
          {review.badKeywordList.length > 0 && (
            <div className="ml-16.75">
              <p className="font-medium text-[#222829] mb-1">약점 키워드</p>
              <div className="flex flex-wrap">
                {review.badKeywordList.map((k) => (
                  <span
                    key={k}
                    className="h-11 px-5 py-3.25 rounded mr-3 bg-[#F5F8F8] text-sm text-[#222829] mb-2"
                  >
                    {getEmoji(k, "negative")} {k}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="w-full border my-9 border-[#E1EDF0]"></div>
        </div>
      ))}
    </div>
  );
}
