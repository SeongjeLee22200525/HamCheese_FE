"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/UserMenu";

export default function Header() {
  const pathname = usePathname().toLowerCase();
  const isMate = pathname.includes("mate");
  const isTeam = pathname.includes("team");
  const isLoggedIn = true;

  return (
    <header className="w-full h-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-20 h-full">
        
        {/* 실제 콘텐츠 영역 */}
        <div className="flex items-center justify-between pt-14">
          
          {/* 왼쪽 */}
          <div className="flex items-center gap-14">
            
            {/* 로고 */}
            <Link
              href="/"
              className="text-black text-3xl font-light font-['Paperlogy'] leading-none"
            >
              MateCheck
            </Link>

            {/* 네비 */}
            <nav className="flex items-center gap-8">
              <Link
                href="/mate"
                className={`pb-1 text-base font-medium transition-colors
                  ${
                    isMate
                      ? "text-black border-b border-black"
                      : "text-gray-300 hover:text-black"
                  }`}
              >
                메이트 찾기
              </Link>

              <Link
                href="/team"
                className={`pb-1 text-base font-medium transition-colors
                  ${
                    isTeam
                      ? "text-black border-b border-black"
                      : "text-gray-300 hover:text-black"
                  }`}
              >
                팀원 구하기
              </Link>
            </nav>
          </div>

          {/* 오른쪽 */}
          {isLoggedIn ? (
            <UserMenu name="박소dbf" />
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/login" className="hover:text-black">
                로그인
              </Link>
              <span>|</span>
              <Link href="/signup" className="hover:text-black">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
