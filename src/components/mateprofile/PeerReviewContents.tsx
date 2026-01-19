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

export default function PeerReviewContents(props: Props) {
  const [sortType, setSortType] = useState<"count" | "recent">("count");
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-b-lg rounded-tr-lg shadow px-20 py-10">
      {/* ===== 상단 헤더 ===== */}
      <div className="flex justify-end mb-8 relative">
        <div className="relative w-36">
          {/* 버튼 */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="
              w-full h-10 px-4
              flex items-center justify-between
              rounded-md
              border border-[#E1EDF0]
              bg-white
              text-sm text-[#495456]
              shadow-sm
            "
          >
            <span>{sortType === "count" ? "많이 받은 순" : "최신순"}</span>
            <img
              src="/dropdownArrow.svg"
              alt="toggle"
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* 드롭다운 */}
          {open && (
            <div
              className="
                absolute right-0 top-full mt-2
                w-full bg-white
                rounded-lg
                shadow-[0px_8px_24px_rgba(0,0,0,0.12)]
                z-30 overflow-hidden
              "
            >
              <ul className="text-sm text-[#495456]">
                <li
                  onClick={() => {
                    setSortType("count");
                    setOpen(false);
                  }}
                  className="px-4 py-3 cursor-pointer hover:bg-[#F5F8F8]"
                >
                  많이 받은 순
                </li>
                <li
                  onClick={() => {
                    setSortType("recent");
                    setOpen(false);
                  }}
                  className="px-4 py-3 cursor-pointer hover:bg-[#F5F8F8]"
                >
                  최신순
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ===== 스크롤 영역 ===== */}
      <div
        className={`
          overflow-y-auto pr-2
          transition-[max-height] duration-300 ease-in-out
          ${sortType === "count" ? "max-h-100vh" : "max-h-130"}
        `}
      >
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
    </div>
  );
}
