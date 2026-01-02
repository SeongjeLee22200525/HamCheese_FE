"use client";
import { MateProfileInfo } from "@/types/user";

type Props = {
  profile: MateProfileInfo;
  onGivePiece?: () => void;
  onPeerReview?: () => void;
};

export default function Profile({ profile, onGivePiece, onPeerReview }: Props) {
  const {
    name,
    email,
    department,
    firstMajor,
    secondMajor,
    gpa,
    grade,
    studentId,
    semester,
    imageUrl,
  } = profile;

  return (
    // 전체 블럭
    <div>
      <div className="w-[350px] bg-[#F5F8F8] shadow-sm">
        <div className="p-10 text-[#222829]">
          {/* ===== 프로필 이미지 ===== */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full bg-[#D9EEF0] mb-8">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`${name} profile`}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            <h2 className="text-2xl font-extrabold mb-2">
              {name} <span className="font-medium">학부생</span>
            </h2>
            <p className="text-medium text-[#838F91]">{department}</p>
          </div>

          {/* ===== 기본 정보 ===== */}
          <div className="mt-8 space-y-4 text-base ">
            <InfoRow label="학번" value={studentId} />
            <InfoRow label="학년" value={`${grade}학년`} />
            <InfoRow label="학기수" value={`${semester}학기`} />
            <InfoRow
              label="전공"
              value={
                secondMajor ? `${firstMajor} · ${secondMajor}` : firstMajor
              }
            />
            {gpa !== undefined && (
              <InfoRow label="학점" value={gpa.toFixed(2)} />
            )}
            <InfoRow label="이메일" value={email} />
          </div>
        </div>
      </div>
      {/* ===== 버튼 영역 ===== */}
      <div className="mt-6 flex flex- gap-3">
        <button
          onClick={onGivePiece}
          className="w-[169px] h-16 py-2 rounded bg-[#00C3CC] text-white text-xl font-extrabold flex items-center justify-center gap-2.5 hover:bg-[#0FA4AB] active:bg-[#1A858A]"
        >
          <img src="/sendingpiece.svg" className="w-7.5 h-7.5" />
          조각 건네기
        </button>
        <button
          onClick={onPeerReview}
          className="w-[169px] h-16 py-2 rounded bg-[#00C3CC] text-white text-xl font-extrabold hover:bg-[#0FA4AB] active:bg-[#1A858A]"
        >
          동료평가 하기
        </button>
      </div>
    </div>
  );
}

/* ===== 내부 전용 컴포넌트 ===== */
function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex ">
      <span className="text-[#222829] font-extrabold w-14 mr-4">{label}</span>
      <span className="font-medium text-[#222829]">{value}</span>
    </div>
  );
}
