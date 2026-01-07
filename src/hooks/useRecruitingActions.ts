// hooks/useRecruitingActions.ts
import { useRouter } from "next/router";
import { deleteRecruiting } from "@/api/recruiting";

export const useRecruitingActions = (recruitingId: number, myId: number) => {
  const router = useRouter();

  const handleEdit = () => {
    // (선택) 수정 시 스낵바도 원하면 여기서 setItem
    sessionStorage.setItem("recruitingEdit", "true");
    router.push(`/recruitmate/edit/${recruitingId}`);
  };

  const handleDelete = async () => {
    const ok = confirm("모집글을 삭제하시겠습니까?");
    if (!ok) return;

    await deleteRecruiting(recruitingId, myId);

    //  삭제 성공 스낵바 플래그
    sessionStorage.setItem("recruitingDeleted", "true");

    //  목록으로 이동
    router.replace("/recruitmate");
  };

  return { handleEdit, handleDelete };
};
