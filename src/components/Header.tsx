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
      <div className="w-full h-full px-[120px]">
        {/* 실제 콘텐츠 영역 */}
        <div className="flex items-center justify-between pt-14">
          
          {/* 왼쪽 */}
          <div className="flex items-baseline gap-14">
            {/* 로고 */}
            <Link
              href="/"
              className="text-[#222829] text-3xl font-light font-['Paperlogy'] leading-none"
            >
              MateCheck
            </Link>

            {/* 네비 */}
            <nav className="flex items-baseline gap-8 font-['Pretendard_Variable'] text-base font-medium">
              <Link
                href="/searchmate"
                className={`pb-1 transition-all
                  ${
                    isMate
                      ? "text-[#222829] border-b border-black font-semibold"
                      : "text-[#222829] border-b border-transparent hover:border-black active:border-black active:opacity-80"
                  }`}
              >
                메이트 찾기
              </Link>

              <Link
                href="/recruitmate"
                className={`pb-1 transition-all
                  ${
                    isTeam
                      ? "text-[#222829] border-b border-black font-semibold"
                      : "text-[#222829] border-b border-transparent hover:border-black active:border-black active:opacity-80"
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
