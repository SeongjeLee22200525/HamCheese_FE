import Link from "next/link";
import { useRouter } from "next/router";
import TabSvg from "@/components/mypage/TabSvg";

export default function MyPageTabs() {
  const router = useRouter();

  const tabs = [
    { href: "/mypage", label: "내 정보" },
    { href: "/mypage/posts", label: "내가 쓴 글" },
    { href: "/mypage/reviews", label: "나의 동료평가" },
  ];

  return (
    <div className="flex bg-[#F5F8F8]">
      {tabs.map((tab) => {
        const isActive = router.pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative -mr-2 ${isActive ? "z-10" : "z-0"}`}
          >
            {/* SVG 배경 */}
            <TabSvg active={isActive} />

            {/* 텍스트 */}
            <div
              className={`
                  absolute inset-0 flex items-center justify-center -ml-2
                  text-xl font-extrabold
                  ${isActive ? "text-[#1A858A]" : "text-[#495456] font-medium"}
                `}
            >
              {tab.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
