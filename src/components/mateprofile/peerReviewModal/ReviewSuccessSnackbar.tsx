// src/components/mateprofile/peerReviewModal/ReviewSuccessSnackbar.tsx
"use client";

import { useEffect } from "react";

type Props = {
  onClose: () => void;
};

export default function ReviewSuccessSnackbar({ onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 30000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-12 left-12 z-[10000]">
      <div className="flex items-center justify-between w-[440px] h-[90px] bg-[#222829E5] px-10 rounded-lg">
        <div className="flex items-center text-white font-medium">
          
          동료평가가 완료되었어요!
        </div>

        <button
          onClick={onClose}
          className="text-base font-extrabold text-[#00C3CC] hover:underline"
        >
          확인
        </button>
      </div>
    </div>
  );
}
