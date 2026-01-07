"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function PokingConfirmModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* dim */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-134 h-63.5 bg-white rounded-xl p-15 text-center">
          <p className="text-lg font-bold mb-13 text-[#222829]">
            {" "}
            퍼즐 조각을 건네시겠습니까?
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="w-50 h-15 rounded bg-[#E5F1F2] text-[#495456] font-bold"
            >
              그만두기
            </button>

            <button
              onClick={onConfirm}
              className="w-50 h-15 rounded bg-[#00C3CC] text-white font-bold"
            >
              건네기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
