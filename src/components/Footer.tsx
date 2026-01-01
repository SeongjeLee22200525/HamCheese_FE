"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-48 bg-white border-t">
      <div className="w-full h-full px-[200px]">
        
        {/* 실제 콘텐츠 영역 */}
        <div className="flex items-center justify-between pt-20">
          
          {/* 왼쪽 링크들 */}
          <div className="flex items-center gap-14 text-base font-medium font-['Pretendard_Variable'] text-[#838F91]">
            <Link href="/terms" className="hover:text-black">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-black">
              개인정보취급방침
            </Link>
            <Link href="/faq" className="hover:text-black">
              자주 찾는 질문
            </Link>
            <Link href="/contact" className="hover:text-black">
              문의
            </Link>
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
