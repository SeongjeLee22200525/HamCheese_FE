"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/UserMenu";

export default function Header() {
  const pathname = usePathname().toLowerCase();

  const isMate = pathname.includes("mate");
  const isTeam = pathname.includes("team");

  // 🔥 임시 로그인 상태
  const isLoggedIn = true;

  const baseStyle =
    "text-xl px-4 py-1 rounded-[15px] transition-colors font-bold";

  return (
    <header className="w-full flex items-center bg-white justify-between px-20 py-6 border-b">
      <div className="flex items-center gap-12">
        {/* 로고 */}
        <Link
          href="/"
          className="justify-start text-black text-3xl font-light font-['Paperlogy']"
        >
          MateCheck
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-10">
          <Link
            href="/mate"
            className={
              baseStyle +
              (isMate ? " text-black" : " hover:bg-black/10")
            }
          >
            메이트 찾기
          </Link>

          <Link
            href="/team"
            className={
              baseStyle +
              (isTeam ? " text-black" : " hover:bg-black/10")
            }
          >
            팀원 구하기
          </Link>
        </nav>
      </div>

      {/* 오른쪽 영역 */}
      {isLoggedIn ? (
        <UserMenu name="박소dbf" />
      ) : (
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/signup" className="hover:underline">
            회원가입
          </Link>
        </div>
      )}
    </header>
  );
}
