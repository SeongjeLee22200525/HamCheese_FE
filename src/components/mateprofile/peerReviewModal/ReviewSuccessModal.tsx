// src/components/mateprofile/peerReviewModal/ReviewSuccessModal.tsx
"use client";

type Props = {
  onConfirm: () => void;
};

export default function ReviewSuccessModal({ onConfirm }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-xl border border-[#EEF2F3] px-10 py-12">
        <p className="text-center text-xl font-extrabold text-[#222829] mb-10">
          동료평가가 완료됐습니다!
        </p>

        <div className="flex items-center justify-center">
          <button
            onClick={onConfirm}
            className="w-[180px] h-14 rounded-md font-extrabold bg-[#00C3CC] text-white hover:bg-[#00B2BA] active:bg-[#009AA1]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
