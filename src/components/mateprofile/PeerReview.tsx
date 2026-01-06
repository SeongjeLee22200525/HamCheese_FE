"use client";

import PeerReviewContents from "./PeerReviewContents";

type Props = {
  name: string;

  peerGoodKeyword: Record<string, number>;
  goodKeywordCount: number;

  peerBadKeyword: Record<string, number>;
  badKeywordCount: number;

  peerReviewRecent: {
    startDate: string;
    meetSpecific: string;
    goodKeywordList: string[];
    badKeywordList: string[];
  }[];
};

export default function PeerReview(props: Props) {
  return (
    <section className="relative">
      {/* ===== 사다리꼴 탭 ===== */}
      <div className="profile-tab-wrap">
        <div className="profile-tab">
          <span className="profile-tab-text">동료평가</span>
        </div>
      </div>

      <PeerReviewContents {...props} />
    </section>
  );
}
