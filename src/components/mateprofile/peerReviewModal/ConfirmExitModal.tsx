// src/components/mateprofile/peerReviewModal/ConfirmExitModal.tsx
"use client";

type Props = {
  onExit: () => void;
  onContinue: () => void;
};

export default function ConfirmExitModal({ onExit, onContinue }: Props) {
  return (
    // ✅ 기존 모달 위에 얹히는 overlay (배경 투명)
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      {/* 연한 dim (뒤 내용 보이게) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 작은 확인 카드 */}
      <div className="relative w-[536px] h-[260px] bg-white rounded-xl shadow-xl p-15">
        <p className="text-center text-xl font-extrabold text-[#222829] mb-13">
          정말로 동료평가를 그만두시겠습니까?
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onExit}
            className="w-[200px] h-16 rounded-md font-extrabold
              bg-[#E8EFF1] text-[#495456]
              hover:bg-[#DDE7EA] active:bg-[#CFDDE1]"
          >
            그만두기
          </button>

          <button
            onClick={onContinue}
            className="w-[200px] h-16 rounded-md font-extrabold
              bg-[#00C3CC] text-white
              hover:bg-[#00B2BA] active:bg-[#009AA1]"
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
