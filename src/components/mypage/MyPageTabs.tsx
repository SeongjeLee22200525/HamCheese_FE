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
    <div className="relative ml-8 mb-8">
      <div className="flex items-end">
        {tabs.map((tab) => {
          const isActive = router.pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative -mr-4 ${isActive ? "z-10" : "z-0"}`}
            >
              {/* SVG 배경 */}
              <TabSvg active={isActive} />

              {/* 텍스트 */}
              <span
                className={`
                  absolute inset-0 flex items-center justify-center
                  text-base font-extrabold
                  ${isActive ? "text-white" : "text-[#838F91]"}
                `}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
