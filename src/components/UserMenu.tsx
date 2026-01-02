import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  imageUrl?: string;
}

export default function UserMenu({ name, imageUrl }: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* 프로필 이미지 */}
      <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt="profile" width={32} height={32} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm">
            <img src="/images/profile.svg" alt="default profile" />
          </div>
        )}
      </div>

      {/* 설정(마이페이지) */}
      <Link
        href="/mypage"
        className="flex items-center gap-2 text-gray-500 hover:text-black"
      >
        {/* 이름 */}
        <span className="text-sm font-medium">{name} 님</span>

        {/* 설정 아이콘 (오른쪽) */}
        <img src="/images/setting.svg" alt="settings" className="w-6 h-6" />
      </Link>
    </div>
  );
}
