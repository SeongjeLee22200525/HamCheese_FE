import { UserProfile } from "@/types/user";

type Props = {
  user: UserProfile;
};

export default function ProfileCard({ user }: Props) {
  return (
    <article className="border rounded-xl p-5 bg-white hover:shadow-md transition cursor-pointer">
      
      {/* 상단 */}
      <div className="flex gap-4 items-start">
        <img
          src={user.imageUrl || "/images/default-profile.png"}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-lg font-semibold text-[#222729]">
            {user.name}
          </p>

          <p className="text-sm text-[#6B7678] mt-0.5">
            {user.firstMajor}
            {user.secondMajor && ` · ${user.secondMajor}`}
          </p>

          <p className="text-xs text-[#9AA4A6] mt-0.5">
            {user.studentId}
          </p>
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

      {/* 긍정 키워드 */}
      {user.peerGoodKeywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {user.peerGoodKeywords.map((keyword) => (
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
