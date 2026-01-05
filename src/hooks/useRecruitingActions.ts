import { useRouter } from "next/router";
import { deleteRecruiting } from "@/api/recruiting";

export const useRecruitingActions = (
  recruitingId: number,
  myId: number
) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/recruitmate/edit/${recruitingId}`);
  };

  const handleDelete = async () => {
    const ok = confirm("모집글을 삭제하시겠습니까?");
    if (!ok) return;

    await deleteRecruiting(recruitingId, myId);
    router.replace("/recruitmate");
  };

  return { handleEdit, handleDelete };
};
