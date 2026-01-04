import { useRouter } from "next/router";
import { UserProfile } from "@/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { checkIsMyProfile } from "@/api/user";

type Props = {
  user: UserProfile;
};

export default function ProfileCard({ user }: Props) {
  const router = useRouter();
  const myId = useUserStore((state) => state.user?.myId);

  const handleClick = async () => {
    // 로그인 안 된 경우
    if (!myId) {
      router.push("/signin");
      return;
    }

    try {
      const isMyProfile = await checkIsMyProfile(myId, user.userId);

      if (isMyProfile) {
        router.push("/mypage");
      } else {
        router.push(`/mateprofile/${user.userId}`);
      }
    } catch (e) {
      console.error("❌ 프로필 이동 중 오류", e);
      // 실패 시 안전하게 타인 프로필로 이동
      router.push(`/mateprofile/${user.userId}`);
    }
  };

  // 긍정 동료평가 상위 3개
  const topPeerKeywords = Object.entries(user.peerGoodKeywords ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <article
      onClick={handleClick}
      className="border rounded-xl p-5 bg-white hover:shadow-md transition cursor-pointer"
    >
      {/* 상단 */}
      <div className="flex gap-4 items-start">
        <img
          src={user.imageUrl || "/images/default-profile.png"}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-lg font-semibold text-[#222729]">{user.name}</p>

          <p className="text-sm text-[#6B7678] mt-0.5">
            {user.firstMajor}
            {user.secondMajor && ` · ${user.secondMajor}`}
          </p>

          <p className="text-xs text-[#9AA4A6] mt-0.5">{user.studentId}</p>
        </div>
      </div>

      {/* 소개 */}
      <p className="mt-4 text-sm text-[#222729] line-clamp-2 leading-relaxed">
        {user.introduction || "자기소개가 아직 작성되지 않았어요."}
      </p>

      {/* 스킬 */}
      {user.skillList.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {user.skillList.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs rounded-full bg-[#F5F8F8] text-[#00C3CC]"
            >
              #{skill}
            </span>
          ))}
        </div>
      )}

      {/* 긍정 동료평가 상위 3개 */}
      {topPeerKeywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {topPeerKeywords.map(([keyword]) => (
            <span
              key={keyword}
              className="text-xs text-[#6EC6CC] bg-[#F8FBFB] px-2 py-1 rounded"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
