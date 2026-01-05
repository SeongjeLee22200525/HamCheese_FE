import { useRouter } from "next/router";
import { UserProfile } from "@/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { checkIsMyProfile } from "@/api/user";
import { POSITIVE_PEER_KEYWORDS } from "@/constants/peerKeywords";

type Props = {
  user: UserProfile;
};

const DEFAULT_PROFILE_IMAGE = "/images/profile.svg";

export default function ProfileCard({ user }: Props) {
  const router = useRouter();
  const myId = useUserStore((state) => state.user?.myId);

  // ✅ null / 빈값 / 공백 모두 기본 이미지로 처리
  const profileImageSrc = user.imageUrl?.trim() || DEFAULT_PROFILE_IMAGE;

  const handleClick = async () => {
    if (!myId) {
      router.push("/signin");
      return;
    }

    try {
      const isMyProfile = await checkIsMyProfile(myId, user.userId);
      router.push(isMyProfile ? "/mypage" : `/mateprofile/${user.userId}`);
    } catch {
      router.push(`/mateprofile/${user.userId}`);
    }
  };

  const topPeerKeywords = Object.entries(user.peerGoodKeywords ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const MIN_COUNT = 1;
  const MAX_COUNT = 14;
  const MIN_WIDTH = 30;
  const MAX_WIDTH = 360;

  function getMiniBarWidth(count: number) {
    const clamped = Math.min(Math.max(count, MIN_COUNT), MAX_COUNT);
    return (
      MIN_WIDTH +
      ((clamped - MIN_COUNT) / (MAX_COUNT - MIN_COUNT)) *
        (MAX_WIDTH - MIN_WIDTH)
    );
  }

  return (
    <article
      onClick={handleClick}
      className="rounded-lg p-15 outline-1 outline-offset-[-1px] outline-[#E1EDF0] bg-white shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)] hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-start gap-6">
        {/* ================= 이미지 블록 ================= */}
        <div className="shrink-0">
          <img
            src={profileImageSrc}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* ================= 개인정보 블록 ================= */}
        <div className="flex-1">
          <div className="flex items-center pb-2">
            <p className="text-xl font-extrabold text-[#222729]">
              {user.name}
              <span className="font-medium ml-1.25">학부생</span>
            </p>
          </div>

          <div className="flex items-center gap-1">
            <div className="p-2 h-7.5 flex items-center text-xs font-semibold rounded bg-[#F5F8F8] text-[#838F91]">
              {user.studentId}학번
            </div>

            {[user.firstMajor, user.secondMajor]
              .filter(Boolean)
              .map((major) => (
                <div
                  key={major}
                  className="p-2 h-7.5 flex items-center text-xs font-semibold rounded bg-[#F5F8F8] text-[#0FA4AB]"
                >
                  {major}
                </div>
              ))}
          </div>

          <p className="mt-5 mb-6 text-xl text-[#222829] max-w-[569px] truncate leading-relaxed">
            {user.introduction || "자기소개가 아직 작성되지 않았어요."}
          </p>

          {user.skillList.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skillList.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 outline-1 outline-offset-[-1px] outline-[#CEDBDE] text-sm font-medium rounded text-[#838F91]"
                >
                  #{skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ================= 평가 블록 ================= */}
        {topPeerKeywords.length > 0 && (
          <div>
            <p className="mb-3 text-base font-extrabold text-[#838F91]">
              저는 이런 평가를 받았어요
            </p>

            <div className="space-y-1">
              {topPeerKeywords.map(([keyword, count]) => {
                const meta = POSITIVE_PEER_KEYWORDS[keyword];
                if (!meta) return null;

                const barWidth = getMiniBarWidth(count);

                return (
                  <div
                    key={keyword}
                    className="relative w-[370px] h-11 rounded bg-[#F5F8F8] px-4 flex items-center justify-between overflow-hidden"
                  >
                    <div
                      className="absolute left-0 top-0 h-full bg-[#E1EDF0]"
                      style={{ width: `${barWidth}px` }}
                    />

                    <span className="relative z-10 flex items-center gap-2 text-sm font-medium text-[#222829]">
                      <span>{meta.emoji}</span>
                      {keyword}
                    </span>

                    <span className="relative z-10 text-base font-extrabold text-[#00C3CC]">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
