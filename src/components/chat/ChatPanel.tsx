import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import ChatPokingSection from "./ChatPokingSection";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { getGroupChannel } from "@/lib/sendbird/channel";
import { useChatWidget } from "@/hooks/chat/useChatWidget";

type Props = {
  onClose: () => void;
};

export default function ChatPanel({ onClose }: Props) {
  const { currentChannelUrl, closeChat } = useChatWidget();
  const [channel, setChannel] = useState<GroupChannel | null>(null);

  /* channelUrl → GroupChannel */
  useEffect(() => {
    if (!currentChannelUrl) {
      setChannel(null);
      return;
    }

    let alive = true;

    getGroupChannel(currentChannelUrl).then((ch) => {
      if (alive) setChannel(ch);
    });

    return () => {
      alive = false;
    };
  }, [currentChannelUrl]);

  return (
    <div className="fixed right-0 bottom-0 w-225 h-full bg-white rounded-tl-[20px] rounded-bl-[20px] shadow-[0px_-2px_20px_0px_rgba(225,237,240,1.00)] z-9999 flex text-[#222829]">
      {/* ================= 왼쪽 영역 ================= */}
      <div className="w-84 bg-[#E0EDEF] h-full flex flex-col">
        {/* 헤더 */}
        <div className="mt-10 mx-10">
          <button
            onClick={() => {
              closeChat();
              onClose();
            }}
          >
            <img src="/chatclose.svg" alt="close" />
          </button>

          <div className="text-lg font-bold mt-6 mb-10">나의 채팅 내역</div>

          <div className="bg-[#E1EDF0] py-4 px-3 rounded text-sm">
            <span className="font-bold">서예진 학부생</span>이 대화를 거절했어요
          </div>
        </div>

        {/* 찌르기 */}
        <div className="mt-10">
          <ChatPokingSection />
        </div>

        {/* 채팅 리스트 */}
        <div className="flex-1 overflow-y-auto mt-6">
          <ChatList
            currentChannelUrl={currentChannelUrl} // 🔥 선택된 채널 전달
            onSelect={(c) => {
              useChatWidget.getState().openChat(c.url);
            }}
          />
        </div>
      </div>

      {/* ================= 오른쪽 영역 ================= */}
      <div className="flex-1 h-full  ">
        {channel ? (
          <ChatRoom channel={channel} />
        ) : (
          <div className="h-full flex items-center justify-center text-[#B7C4C7] font-medium">
            대화를 선택해주세요
          </div>
        )}
      </div>
    </div>
  );
}
