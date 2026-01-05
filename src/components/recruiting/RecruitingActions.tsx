type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function RecruitingActions({ onEdit, onDelete }: Props) {
  return (
    <div className="flex justify-end mt-4 text-sm text-[#6B7280]">
      <button onClick={onEdit}>수정</button>
      <button onClick={onDelete} className="ml-4 text-red-500">
        삭제
      </button>
    </div>
  );
}
