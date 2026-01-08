"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";
import { getOrCreateChannel } from "@/lib/sendbird/channel";
import { useChatWidget } from "@/hooks/chat/useChatWidget";

type Poking = {
  pokingId: number;
  senderId: number;
  senderName: string;
  recruitingId: number | null;
  projectSpecific?: string;
  date: string;
  imageUrl?: string | null;
};

export default function ChatPokingSection() {
  const myId = useUserStore((s) => s.user?.myId);
  const { openChat } = useChatWidget();

  const [list, setList] = useState<Poking[]>([]);

  useEffect(() => {
    if (!myId) return;

    axios
      .get(`/poking/received/${myId}`)
      .then((res) => setList(res.data))
      .catch(console.error);
  }, [myId]);

  /* ================= 거절 ================= */
  const handleReject = async (pokingId: number) => {
    await axios.delete(`/poking/${pokingId}`, {
      data: { ok: false },
    });

    setList((prev) => prev.filter((p) => p.pokingId !== pokingId));
  };

  /* ================= 수락 ================= */
  const handleAccept = async (p: Poking) => {
    if (!myId) return;

    try {
      // 1️⃣ 채널 생성 / 재사용
      const channel = await getOrCreateChannel(
        String(myId),
        String(p.senderId)
      );

      // 2️⃣ 찌르기 삭제 + 수락 처리
      await axios.delete(`/poking/${p.pokingId}`, {
        data: { ok: true },
      });

      setList((prev) => prev.filter((item) => item.pokingId !== p.pokingId));

      // 3️⃣ 채팅 열기
      openChat(channel.url);
    } catch (err) {
      console.error("채팅 연결 실패", err);
    }
  };

  if (list.length === 0) return null;

  return (
    <div>
      {list.map((p) => (
        <div
          key={p.pokingId}
          className="flex px-10 py-8 border-b border-[#CEDBDE]"
        >
          <img
            src={p.imageUrl || "/profile.svg"}
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />

          <div className="ml-4">
            <div className="font-bold">
              <div className="flex justify-between">
                {p.senderName} 학부생
                <div className="text-sm font-medium text-[#838F91]">
                  {p.date}
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
                onClick={() => handleReject(p.pokingId)}
                className="w-23 py-3 text-sm mr-2 bg-[#CEDBDE] rounded text-[#495456]"
              >
                다음 기회에!
              </button>

              <button
                onClick={() => handleAccept(p)}
                className="w-23 py-3 text-sm bg-[#00C3CC] text-white rounded"
              >
                대화해보기
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
