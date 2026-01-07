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
    const ok = window.confirm("정말 로그아웃 하시겠습니까?");
    if (!ok) return;

    document.cookie = "myId=; Max-Age=0; path=/";
    document.cookie = "name=; Max-Age=0; path=/";

    clearUser();
    alert("로그아웃 되었습니다.");
    router.replace("/");
  };

  /** hydration 이전 렌더 방지 */
  if (!mounted) return null;

  return (
    <header className="w-full h-[200px] bg-transparent">
      <div className="w-full h-full px-[80px]">
        <div className="flex items-center justify-between pt-[60px]">
          {/* ================= 좌측 ================= */}
          <div className="flex items-baseline gap-16">
            <Link
              href="/"
              className="text-[#222829] text-3xl font-light leading-none"
            >
              <img src="/images/logo.svg" alt="logo" className="w-32 h-8" />
            </Link>

            <nav className="flex items-baseline font-medium pl-8">
              <Link
                href="/searchmate"
                className={`px-8 py-5 pb-4 inline-flex transition-all border-b-3 rounded-tl rounded-tr ${
                  isMate
                    ? "text-[#00C3CC] border-[#00C3CC] border-b-3 font-semibold text-lg"
                    : "text-[#222829] border-transparent hover:border-[#B7C4C7] hover:border-b-3 hover:bg-[#F5F8F8] text-lg"
                }`}
              >
                메이트 둘러보기
              </Link>

              <Link
                href="/recruitmate"
                className={`px-8 py-5 pb-4 inline-flex transition-all border-b-3 rounded-tl rounded-tr ${
                  isTeam
                    ? "text-[#00C3CC] border-[#00C3CC] border-b-3 font-semibold text-lg"
                    : "text-[#222829] border-transparent hover:border-[#B7C4C7] hover:border-b-3 hover:bg-[#F5F8F8] text-lg"
                }`}
              >
                모집하기
              </Link>
            </nav>
          </div>

          {/* ================= 우측 ================= */}
          {user ? (
            <Link href="/mypage" className="flex items-center gap-4">
              {/* 프로필 이미지 */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={user.profileImageUrl!}
                  alt="profile"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>

              {/* 이름 */}
              <span className="text-base font-bold text-[#222829] leading-none">
                {user.name}
                <span className="ml-1 text-base font-medium">학부생</span>
              </span>

              {/* 구분선 */}
              <div className="justify-start text-[#B7C4C7] text-base font-medium">
                |
              </div>

              {/* 로그아웃 */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="text-base text-[#495456] font-medium hover:underline"
              >
                로그아웃
              </button>
            </Link>
          ) : (
            <button
              onClick={() => router.push("/signin")}
              className="text-base text-gray-400 hover:text-black font-medium"
            >
              로그인 | 회원가입
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
