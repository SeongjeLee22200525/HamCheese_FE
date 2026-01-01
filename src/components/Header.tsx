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
                className={`px-7 py-4 gap-2.5 pb-3 transition-all border-b-2 inline-flex rounded-tl rounded-tr
                  ${
                    isMate
                      ? "text-[#00C3CC] border-b border-[#00C3CC] font-semibold"
                      : "text-[#222829] border-b border-transparent hover:border-[#B7C4C7] hover:bg-[#F5F8F8] hover:text-[#222829] active:border-[#00C3CC] active:text-[#00C3CC] active:bg-[#B7C4C7]"
                  }`}
              >
                메이트 둘러보기
              </Link>

              <Link
                href="/recruitmate"
                className={`px-7 py-4 gap-2.5 pb-3 transition-all border-b-2 inline-flex rounded-tl rounded-tr
                  ${
                    isTeam
                      ? "text-[#00C3CC] border-b border-[#00C3CC] font-semibold"
                      : "text-[#222829] border-b border-transparent hover:border-[#B7C4C7] hover:bg-[#F5F8F8] hover:text-[#222829] active:border-[#00C3CC] active:text-[#00C3CC] active:bg-[#B7C4C7]"
                  }`}
              >
                모집하기
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
