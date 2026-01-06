"use client";

type Props = {
  peerReviewRecent: {
    startDate: string;
    meetSpecific: string;
    goodKeywordList: string[];
    badKeywordList: string[];
  }[];
};

export default function ReviewByTime({ peerReviewRecent }: Props) {
  if (peerReviewRecent.length === 0) {
    return (
      <p className="text-sm text-[#838F91]">아직 받은 동료평가가 없습니다.</p>
    );
  }

  return (
    <ul className="space-y-6">
      {peerReviewRecent.map((review, idx) => (
        <li key={idx} className="border border-[#E1EDF0] rounded-lg p-6">
          {/* 날짜 + 만난 곳 */}
          <div className="flex justify-between mb-4 text-sm text-[#495456]">
            <span>{review.startDate}</span>
            <span>{review.meetSpecific}</span>
          </div>

          {/* 좋은 점 */}
          {review.goodKeywordList.length > 0 && (
            <div className="mb-3">
              <p className="font-semibold text-[#00C3CC] mb-1">좋았던 점</p>
              <div className="flex flex-wrap gap-2">
                {review.goodKeywordList.map((k) => (
                  <span
                    key={k}
                    className="px-3 py-1 rounded bg-[#EEF7F8] text-sm text-[#0FA4AB]"
                  >
                    #{k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 아쉬운 점 */}
          {review.badKeywordList.length > 0 && (
            <div>
              <p className="font-semibold text-[#F87171] mb-1">아쉬운 점</p>
              <div className="flex flex-wrap gap-2">
                {review.badKeywordList.map((k) => (
                  <span
                    key={k}
                    className="px-3 py-1 rounded bg-[#FEF2F2] text-sm text-[#DC2626]"
                  >
                    #{k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
