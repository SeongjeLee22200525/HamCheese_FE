// src/components/common/ConfirmModal.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  title: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

let __lockCount = 0;
let __prevOverflow = "";
let __prevPaddingRight = "";

function lockBodyScroll() {
  if (typeof document === "undefined") return;

  if (__lockCount === 0) {
    __prevOverflow = document.body.style.overflow;
    __prevPaddingRight = document.body.style.paddingRight;

    // 스크롤바 사라지면서 화면 흔들림 방지(선택이지만 보통 같이 함)
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
  }

  __lockCount += 1;
}

function unlockBodyScroll() {
  if (typeof document === "undefined") return;

  __lockCount = Math.max(0, __lockCount - 1);

  if (__lockCount === 0) {
    document.body.style.overflow = __prevOverflow;
    document.body.style.paddingRight = __prevPaddingRight;
  }
}

export default function ConfirmModal({
  title,
  cancelText = "취소",
  confirmText = "확인",
  onCancel,
  onConfirm,
}: Props) {
  // ✅ 이 모달 인스턴스가 락을 걸었는지 추적
  const lockedRef = useRef(false);

  // mount 시 락
  useEffect(() => {
    lockBodyScroll();
    lockedRef.current = true;

    return () => {
      if (lockedRef.current) {
        unlockBodyScroll();
        lockedRef.current = false;
      }
    };
  }, []);

  // ✅ 닫기/확인 시에도 “즉시” 락 해제 (라우팅/step 변경으로 cleanup 누락 대비)
  const safeClose = (fn: () => void) => {
    if (lockedRef.current) {
      unlockBodyScroll();
      lockedRef.current = false;
    }
    fn();
  };

  // ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        safeClose(onCancel);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* dim */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={() => safeClose(onCancel)}
      />

      {/* 카드 */}
      <div
        className="relative w-[536px] h-[300px] bg-white rounded-xl shadow-xl p-15"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-lg font-bold text-[#222829] mb-13 whitespace-pre-line">
          {title}
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => safeClose(onCancel)}
            className="w-[200px] h-16 rounded-md text-lg font-bold
              bg-[#E8EFF1] text-[#495456]
              hover:bg-[#DDE7EA] active:bg-[#CFDDE1]"
          >
            {cancelText}
          </button>

          <button
            onClick={() => safeClose(onConfirm)}
            className="w-[200px] h-16 rounded-md text-lg font-bold
              bg-[#00C3CC] text-white
              hover:bg-[#00B2BA] active:bg-[#009AA1]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
