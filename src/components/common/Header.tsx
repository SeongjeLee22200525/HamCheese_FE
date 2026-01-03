"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

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
  }, [storeName]);

  const handleLogout = () => {
    document.cookie = "myId=; Max-Age=0; path=/";
    document.cookie = "name=; Max-Age=0; path=/";

    clearUser();
    setIsLoggedIn(false);
    setDisplayName("");

    router.replace("/signin");
  };

  return (
    <header className="w-full h-50 bg-white">
      <div className="w-full h-full px-[120px]">
        <div className="flex items-center justify-between pt-14">
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

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src="/images/profile.svg"
                  alt="profile"
                  width={36}
                  height={36}
                />
              </div>

              <span className="text-sm font-medium text-[#222829]">
                {displayName}
              </span>

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 font-semibold hover:underline"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/signin" className="hover:text-black">
                로그인
              </Link>
              <span>|</span>
              <Link href="/joinmc" className="hover:text-black">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
