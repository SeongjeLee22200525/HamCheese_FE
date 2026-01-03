// src/components/mateprofile/peerReviewModal/PeerReviewModal.tsx
"use client";

import { useEffect, useState } from "react";
import PeerReviewForm, { PeerReviewSubmitPayload } from "./PeerReviewForm";
import ConfirmExitModal from "./ConfirmExitModal";
import ReviewSuccessModal from "./ReviewSuccessModal";
import type { MetaTag } from "@/types/user";

type Step = "FORM" | "CONFIRM_EXIT" | "SUCCESS";

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
  const [submittedPayload, setSubmittedPayload] =
    useState<PeerReviewSubmitPayload | null>(null);

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
    setSubmittedPayload(payload);
    setStep("SUCCESS");
  };

  const handleSuccessConfirm = () => {
    if (submittedPayload) onSubmit(submittedPayload);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* ===== dim ===== */}
      <div className="absolute inset-0 bg-black/40" onClick={requestClose} />

      {/* ===== modal wrapper ===== */}
      <div className="relative w-full h-full flex items-center justify-center px-6">
        {/* ===== modal card (고정 크기) ===== */}
        <div className="relative w-[1200px] h-[800px] bg-white rounded-xl overflow-hidden">
          {/* X 버튼 */}
          <button
            onClick={requestClose}
            className="absolute right-25 top-25 text-[#B7C4C7] hover:text-[#495456] text-2xl z-10"
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

          {/* ✅ 위에 얹히는 confirm */}
          {step === "CONFIRM_EXIT" && (
            <ConfirmExitModal
              onExit={onClose}
              onContinue={() => setStep("FORM")}
            />
          )}

          {/* ✅ 위에 얹히는 success */}
          {step === "SUCCESS" && (
            <ReviewSuccessModal onConfirm={handleSuccessConfirm} />
          )}
        </div>
      </div>
    </div>
  );
}
