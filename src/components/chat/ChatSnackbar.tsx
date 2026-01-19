// src/components/common/Snackbar.tsx
"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  actionText?: string;
  duration?: number;
  onAction?: () => void;
  onClose: () => void;
};

export default function Snackbar({
  message,
  actionText = "확인",
  duration = 40000,
  onAction,
  onClose,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const handleClick = () => {
    if (onAction) onAction();
    else onClose();
  };

  return (
    <div className="fixed bottom-10 right-106 z-99999">
      <div className="flex items-center justify-between w-110  bg-[#222829E5] px-10 py-8 rounded-lg">
        <div className="flex items-center text-base text-white font-medium whitespace-pre-line break-keep">
          {message}
        </div>

        <button
          onClick={handleClick}
          className="text-base font-extrabold text-[#00C3CC] hover:underline"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
}
