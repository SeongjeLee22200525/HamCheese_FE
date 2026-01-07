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
  recruitingTitle?: string;
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

  const handleReject = async (pokingId: number) => {
    await axios.delete(`/poking/${pokingId}`);
    setList((prev) => prev.filter((p) => p.pokingId !== pokingId));
  };

  const handleAccept = async (p: Poking) => {
    if (!myId) return;

    try {
      // 1️⃣ Sendbird 1:1 채널 생성 or 재사용
      const channel = await getOrCreateChannel(
        String(myId),
        String(p.senderId)
      );

      // 2️⃣ 콕 찌르기 삭제
      await axios.delete(`/poking/${p.pokingId}`);
      setList((prev) => prev.filter((item) => item.pokingId !== p.pokingId));

      // 3️⃣ 채팅 위젯 열기 (🔥 핵심)
      openChat(channel.url);
    } catch (err) {
      console.error("채팅 연결 실패", err);
    }
  };

  if (list.length === 0) return null;

  return (
    <div>
      {list.map((p) => (
        <div key={p.pokingId} className="flex px-5 pt-4 pb-6 border-b-2">
          <img
            src={p.imageUrl || "/profile.svg"}
            alt="profile"
            className="w-17 h-17 rounded-full object-cover"
          />

          <div className="ml-4.5 flex-1">
            {p.recruitingId && (
              <div className="text-xs text-[#00C3CC] font-bold">
                [{p.recruitingTitle}]
              </div>
            )}

            <div className="text-[#222829] text-base font-bold">
              {p.senderName} 학부생
              <span className="font-medium">이 함께 하고 싶어해요.</span>
            </div>

            <div className="text-base text-[#838F91] my-2">{p.date}</div>

            <div className="flex gap-2 font-bold">
              <button
                onClick={() => handleReject(p.pokingId)}
                className="w-28 px-4 py-3 text-base bg-[#E1EDF0] rounded text-[#495456]"
              >
                다음 기회에!
              </button>

              <button
                onClick={() => handleAccept(p)}
                className="w-28 px-4 py-3 text-base bg-[#00C3CC] text-white rounded"
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
