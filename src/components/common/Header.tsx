"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";

/** 쿠키 유틸 */
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname.toLowerCase();

  const isMate = pathname === "/searchmate";
  const isTeam = pathname === "/recruitmate";

  const { name: storeName, clearUser } = useUserStore();

  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

  /** ✅ CSR 이후 쿠키 기준 로그인 판단 */
  useEffect(() => {
    const myId = getCookie("myId");
    const cookieName = getCookie("name");

    if (myId) {
      setIsLoggedIn(true);
      setDisplayName(
        storeName || (cookieName ? decodeURIComponent(cookieName) : "")
      );
    } else {
      setIsLoggedIn(false);
      setDisplayName("");
    }
  }, []); // 👈 의존성 제거
  useEffect(() => {
    setMounted(true);
  }, []);

  /** ✅ 로그아웃 */
  const handleLogout = () => {
    document.cookie = "myId=; Max-Age=0; path=/";
    document.cookie = "name=; Max-Age=0; path=/";

    clearUser();
    setIsLoggedIn(false);
    setDisplayName("");

    router.replace("/signin");
  };

  /** ⛔ hydration 단계에서는 렌더 안 함 */
  if (!mounted) return null;

  return (
    <header className="w-full h-50 bg-white">
      <div className="w-full h-full px-[120px]">
        <div className="flex items-center justify-between pt-14">
          {/* ================= 좌측 ================= */}
          <div className="flex items-baseline gap-14">
            <Link
              href="/"
              className="text-[#222829] text-3xl font-light font-['Paperlogy'] leading-none"
            >
              MateCheck
            </Link>

            <nav className="flex items-baseline gap-8 font-['Pretendard_Variable'] text-base font-medium">
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
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* 프로필 */}
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                  src="/images/profile.svg"
                  alt="profile"
                  width={36}
                  height={36}
                />
              </div>

              {/* 이름 */}
              <span className="text-sm text-[#222829] text-base font-extrabold leading-none">
                {displayName} <span className="text-m font-medium text-[#222829]">학부생</span>
              </span>

              {/* 구분선 (| 대체) */}
              <div className="w-px h-4 bg-[#E5E7EB]" />

              {/* 로그아웃 */}
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 font-semibold leading-none hover:underline"
              >
                로그아웃
              </button>
            </div>
          ) : (
            /** 로그인 | 회원가입 묶음 */
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
