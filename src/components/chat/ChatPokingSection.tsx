"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";

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

  const handleAccept = async (pokingId: number) => {
    // ❗️지금은 채팅 생성 안 함 (나중에 연결)
    await axios.delete(`/poking/${pokingId}`);
    setList((prev) => prev.filter((p) => p.pokingId !== pokingId));
  };

  if (list.length === 0) return null;

  return (
    <div className=" border-b">
      {list.map((p) => (
        <div key={p.pokingId} className="flex items-center px-5 pt-4 pb-6">
          {/* ✅ 프로필 이미지 */}
          <img
            src={p.imageUrl || "/profile.svg"}
            alt="profile"
            className="w-17 h-17 rounded-full object-cover"
          />
          <div className="ml-4.5">
            {/* 텍스트 영역 */}
            <div className="flex-1">
              {p.recruitingId ? (
                <div className="text-xs text-[#00C3CC] font-bold">
                  [{p.recruitingTitle}]
                </div>
              ) : null}

              <div className="text-[#222829] text-base font-bold">
                {p.senderName} 학부생
                <span className="font-medium">이 함께 하고 싶어해요.</span>
              </div>

              <div className="text-xs text-gray-400">{p.date}</div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 text-[#495456] font-bold">
              <button
                onClick={() => handleReject(p.pokingId)}
                className="px-4 py-3 text-base bg-[#E1EDF0] rounded"
              >
                다음 기회에!
              </button>

              <button
                onClick={() => handleAccept(p.pokingId)}
                className="px-3 py-1 text-xs bg-[#00C3CC] text-white rounded"
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
