// src/components/mateprofile/peerReviewModal/PeerReviewModal.tsx
"use client";

import { useEffect, useState } from "react";
import PeerReviewForm, { PeerReviewSubmitPayload } from "./PeerReviewForm";
import ConfirmExitModal from "./ConfirmExitModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import Snackbar from "@/components/common/Snackbar";

import type { MetaTag } from "@/types/user";

type Step = "FORM" | "CONFIRM_EXIT";

type Props = {
  targetName: string;
  targetImageUrl?: string;
  targetMetaTags?: MetaTag[];
  onClose: () => void;
  onSubmit: (payload: PeerReviewSubmitPayload) => void;
};

export default function PeerReviewModal({
  targetName,
  targetImageUrl,
  targetMetaTags = [],
  onClose,
  onSubmit,
}: Props) {
  const [step, setStep] = useState<Step>("FORM");
  const [showSuccess, setShowSuccess] = useState(false);

  /* ===== ESC 키 처리 ===== */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      if (step === "FORM") setStep("CONFIRM_EXIT");
      else onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step, onClose]);

  /* ===== body 스크롤 방지 ===== */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const requestClose = () => {
    if (step === "FORM") setStep("CONFIRM_EXIT");
    else onClose();
  };

  const handleSubmit = (payload: PeerReviewSubmitPayload) => {
    onSubmit(payload); // ✅ 서버 전송
    setShowSuccess(true); // ✅ 스낵바 표시
    onClose(); // ✅ 모달 닫기
  };

  return (
    <>
      {/* ================= MODAL ================= */}
      <div className="fixed inset-0 z-9999">
        {/* dim */}
        <div className="absolute inset-0 bg-black/40" onClick={requestClose} />

        {/* modal wrapper */}
        <div className="relative w-full h-full flex items-center justify-center px-6">
          <div className="relative w-300 h-200 bg-white rounded-xl overflow-hidden">
            {/* X 버튼 */}
            <button
              onClick={requestClose}
              className="absolute right-25 top-25 z-10"
              aria-label="close"
            >
              <img src="/cancel.svg" alt="close icon" />
            </button>

            <PeerReviewForm
              targetName={targetName}
              targetImageUrl={targetImageUrl}
              targetMetaTags={targetMetaTags}
              onCancel={() => setStep("CONFIRM_EXIT")}
              onSubmit={handleSubmit}
            />

            {step === "CONFIRM_EXIT" && (
              <ConfirmExitModal
                onExit={onClose}
                onContinue={() => setStep("FORM")}
              />
            )}
          </div>
        </div>
      </div>

      {/* ================= SUCCESS SNACKBAR ================= */}
      {showSuccess && (
        <Snackbar
          message="동료평가가 완료되었어요!"
          actionText="확인"
          duration={3000}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}
