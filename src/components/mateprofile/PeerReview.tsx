"use client";

import { useState } from "react";
import ReviewByCount from "../ReviewByCount";
import ReviewByTime from "../ReviewByTime";

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
  const [sortType, setSortType] = useState<"count" | "recent">("count");

  return (
    <section className="relative">
      {/* ===== 사다리꼴 탭 ===== */}
      <div className="profile-tab-wrap">
        <div className="profile-tab">
          <span className="profile-tab-text">동료평가</span>
        </div>
      </div>

      {/* ===== 콘텐츠 ===== */}
      <div className="bg-white rounded-b-lg rounded-tr-lg shadow px-20 pt-10 pb-10">
        {/* 상단 헤더 */}
        <div className="flex justify-between items-center mb-10">
          <span className="text-base font-medium text-[#495456]">
            {sortType === "count" ? "많이 받은 순" : "최신순"}
          </span>

          {/* 드롭다운 */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as any)}
            className="border border-[#E1EDF0] rounded px-3 py-2 text-sm text-[#495456]"
          >
            <option value="count">많이 받은 순</option>
            <option value="recent">최신순</option>
          </select>
        </div>

        {/* ===== 분기 렌더링 ===== */}
        {sortType === "count" ? (
          <ReviewByCount
            name={props.name}
            peerGoodKeyword={props.peerGoodKeyword}
            goodKeywordCount={props.goodKeywordCount}
            peerBadKeyword={props.peerBadKeyword}
            badKeywordCount={props.badKeywordCount}
          />
        ) : (
          <ReviewByTime peerReviewRecent={props.peerReviewRecent} />
        )}
      </div>
    </section>
  );
}
