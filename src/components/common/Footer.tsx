"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-75 bg-white ">
      <div className="w-full h-full px-60">
        {/* 실제 콘텐츠 영역 */}
        <div className="flex items-center justify-between pt-50">
          {/* 왼쪽 링크들 */}
          <div className="flex items-center gap-14 text-base font-medium font-['Pretendard_Variable'] text-[#838F91]">
            <span>이용약관</span>
            <span>개인정보취급방침</span>
            <span>자주 찾는 질문</span>
            <span>문의</span>
          </div>

          {/* 오른쪽 카피라이트 */}
          <div className="text-xs font-['Pretendard_Variable'] font-semibold text-[#B7C4C7] text-right">
            Copyright 2025 Ham Cheese Sendwich. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
