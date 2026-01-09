"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";
import { getOrCreateChannel } from "@/lib/sendbird/channel";
import { useChatWidget } from "@/hooks/chat/useChatWidget";
import ConfirmModal from "../common/ConfirmModal";

type Poking = {
  pokingId: number;
  senderId: number;
  senderName: string;
  recruitingId: number | null;
  projectSpecific?: string;
  date: string; // "2026-01-09 07-10"
  imageUrl?: string | null;
};

/* ================= 시간 파싱 + 상대시간 ================= */
/**
 * 서버 시간 형식: "YYYY-MM-DD HH-mm" (UTC)
 */
function getRelativeTime(dateStr?: string) {
  if (!dateStr) return "";

  // ISO 문자열 → Date 객체 (서버가 KST 기준이면 그대로 사용)
  const serverDate = new Date(dateStr);

  if (isNaN(serverDate.getTime())) return "";

  const now = Date.now();
  const diffMs = now - serverDate.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  return `${diffDay}일 전`;
}

type Props = {
  onAcceptSuccess?: () => void;
  onRejectSuccess?: () => void;
};

export default function ChatPokingSection({
  onAcceptSuccess,
  onRejectSuccess,
}: Props) {
  const myId = useUserStore((s) => s.user?.myId);
  const { openChat } = useChatWidget();

  const [list, setList] = useState<Poking[]>([]);
  //메이트 체크 거절 모달
  const [rejectTargetId, setRejectTargetId] = useState<number | null>(null);

  /* ================= 받은 찌르기 조회 ================= */
  useEffect(() => {
    if (!myId) return;

    axios
      .get(`/poking/received/${myId}`)
      .then((res) => {
        console.log("📦 raw poking response:", res.data);
        setList(res.data);
      })
      .catch(console.error);
  }, [myId]);

  /* ✅ 상대시간 한 번만 계산해서 고정 */
  const formattedList = useMemo(
    () =>
      list.map((p) => ({
        ...p,
        relativeTime: getRelativeTime(p.date),
      })),
    [list]
  );

  /* ================= 거절 ================= */
  const handleReject = async (pokingId: number) => {
    await axios.delete(`/poking/${pokingId}`, {
      data: { ok: false },
    });

    setList((prev) => prev.filter((p) => p.pokingId !== pokingId));
    onRejectSuccess?.();
  };

  /* ================= 수락 ================= */
  const handleAccept = async (p: Poking) => {
    if (!myId) return;

    try {
      const channel = await getOrCreateChannel(
        String(myId),
        String(p.senderId)
      );

      await axios.delete(`/poking/${p.pokingId}`, {
        data: { ok: true },
      });

      setList((prev) => prev.filter((item) => item.pokingId !== p.pokingId));

      openChat(channel.url);
      console.log("handleAccept success");
      onAcceptSuccess?.();
    } catch (err) {
      console.error("채팅 연결 실패", err);
    }
  };

  if (formattedList.length === 0) return null;

  return (
    <div>
      {formattedList.map((p) => (
        <div
          key={p.pokingId}
          className="flex px-10 py-8 border-b border-[#CEDBDE]"
        >
          <a href={`/mateprofile/${p.senderId}`}>
            <img
              src={p.imageUrl || "/profile.svg"}
              alt="profile"
              className="w-11 h-11 rounded-full object-cover"
            />
          </a>

          <div className="ml-4 flex-1">
            <div className="font-bold">
              <div className="flex justify-between ">
                <a href={`/mateprofile/${p.senderId}`}>
                  <span className="hover:border-b"> {p.senderName} 학부생</span>
                </a>

                <div className="text-sm font-medium text-[#838F91]">
                  {p.relativeTime}
                </div>
              </div>

              {p.recruitingId && (
                <div className="font-bold text-sm mt-1 text-[#1A858A]">
                  {p.projectSpecific}
                </div>
              )}

              <div className="font-medium mt-1">대화 신청이 왔어요.</div>
            </div>

            <div className="flex font-bold mt-4">
              <button
                onClick={() => setRejectTargetId(p.pokingId)}
                className="w-23 py-3 text-sm mr-2 bg-[#CEDBDE] rounded text-[#495456] hover:bg-[#B7C4C7]  active:bg-[#838F91]"
              >
                다음 기회에!
              </button>

              <button
                onClick={() => handleAccept(p)}
                className="w-23 py-3 text-sm bg-[#00C3CC] text-white rounded hover:bg-[#0FA4AB] active:bg-[#1A858A]"
              >
                대화해보기
              </button>
            </div>
          </div>
        </div>
      ))}
      {rejectTargetId !== null && (
        <ConfirmModal
          title={`정말로 거절하시겠습니까?\n거절하면 채팅을 시작할 수 없어요.`}
          cancelText="취소"
          confirmText="거절하기"
          onCancel={() => setRejectTargetId(null)}
          onConfirm={() => {
            handleReject(rejectTargetId);
            setRejectTargetId(null);
          }}
        />
      )}
    </div>
  );
}
