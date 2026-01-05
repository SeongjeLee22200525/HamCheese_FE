"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname.toLowerCase();

  const isMate = pathname === "/searchmate";
  const isTeam = pathname === "/recruitmate";

  /** zustand */
  const { user, clearUser, hydrateUser } = useUserStore();

  const [mounted, setMounted] = useState(false);

  /** 최초 마운트 시 쿠키 → store 복구 */
  useEffect(() => {
    hydrateUser();
    setMounted(true);
  }, [hydrateUser]);

  /** 로그아웃 */
  const handleLogout = () => {
    document.cookie = "myId=; Max-Age=0; path=/";
    document.cookie = "name=; Max-Age=0; path=/";

    clearUser();
    router.replace("/signin");
  };

  /** hydration 이전 렌더 방지 */
  if (!mounted) return null;

  return (
    <header className="w-full h-50 bg-white">
      <div className="w-full h-full px-[120px]">
        <div className="flex items-center justify-between pt-14">
          {/* ================= 좌측 ================= */}
          <div className="flex items-baseline gap-14">
            <Link
              href="/"
              className="text-[#222829] text-3xl font-light leading-none"
            >
              <img src="/images/logo.svg" alt="logo" className="w-40 h-10" />
            </Link>

            <nav className="flex items-baseline gap-8 text-base font-medium">
              <Link
                href="/searchmate"
                className={`px-7 py-4 pb-3 inline-flex transition-all border-b-2 rounded-tl rounded-tr ${
                  isMate
                    ? "text-[#00C3CC] border-[#00C3CC] font-semibold"
                    : "text-[#222829] border-transparent hover:border-[#B7C4C7] hover:bg-[#F5F8F8]"
                }`}
              >
                메이트 둘러보기
              </Link>

              <Link
                href="/recruitmate"
                className={`px-7 py-4 pb-3 inline-flex transition-all border-b-2 rounded-tl rounded-tr ${
                  isTeam
                    ? "text-[#00C3CC] border-[#00C3CC] font-semibold"
                    : "text-[#222829] border-transparent hover:border-[#B7C4C7] hover:bg-[#F5F8F8]"
                }`}
              >
                모집하기
              </Link>
            </nav>
          </div>

          {/* ================= 우측 ================= */}
          {user ? (
            <Link href="/mypage" className="flex items-center gap-3">
              {/* 프로필 이미지 */}
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                  src={user.profileImageUrl!}
                  alt="profile"
                  width={36}
                  height={36}
                />
              </div>

              {/* 이름 */}
              <span className="text-base font-extrabold text-[#222829] leading-none">
                {user.name}
                <span className="ml-1 text-sm font-medium">학부생</span>
              </span>

              {/* 구분선 */}
              <div className="w-px h-4 bg-[#E5E7EB]" />

              {/* 로그아웃 */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="text-sm text-red-500 font-semibold hover:underline"
              >
                로그아웃
              </button>
            </Link>
          ) : (
            <button
              onClick={() => router.push("/signin")}
              className="text-sm text-gray-400 hover:text-black font-medium"
            >
              로그인 | 회원가입
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
