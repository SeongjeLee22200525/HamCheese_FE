import Image from "next/image";
import Link from "next/link";

interface Props {
  user?: {
    name: string;
    imageUrl?: string;
  } | null;
}

export default function UserMenu({ user }: Props) {
  // 그인 안 된 상태
  if (!user) {
    return (
      <Link
        href="/signin"
        className="text-sm text-gray-500 hover:text-black"
      >
        로그인 | 회원가입
      </Link>
    );
  }

  // 로그인 된 상태
  return (
    <div className="flex items-center gap-3">
      {/* 프로필 이미지 */}
      <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt="profile"
            width={32}
            height={32}
          />
        ) : (
          <img src="/images/profile.svg" alt="default profile" />
        )}
      </div>

      {/* 마이페이지 */}
      <Link
        href="/mypage"
        className="flex items-center gap-2 text-gray-500 hover:text-black"
      >
        <span className="text-sm font-medium">{user.name} 님</span>
        <img src="/images/setting.svg" alt="settings" className="w-6 h-6" />
      </Link>
    </div>
  );
}
