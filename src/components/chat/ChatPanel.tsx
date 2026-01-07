import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import ChatPokingSection from "./ChatPokingSection";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { getGroupChannel } from "@/lib/sendbird/channel";
import { useChatWidget } from "@/hooks/chat/useChatWidget";

type Props = {
  channel: GroupChannel | null;
  onSelect: (c: GroupChannel) => void;
  onClose: () => void;
};

export default function ChatPanel({ onClose }: Props) {
  const { currentChannelUrl, closeChat } = useChatWidget();

  const [channel, setChannel] = useState<GroupChannel | null>(null);

  // 🔥 핵심: channelUrl → GroupChannel 변환
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
    <div className="fixed bottom-px right-42 w-100 h-140 bg-white rounded-tl-lg rounded-tr-lg shadow-[0px_-2px_20px_0px_rgba(225,237,240,1.00)] z-9999 flex flex-col">
      {/* ===== Header ===== */}
      <header className="rounded-tl-lg rounded-tr-lg h-15.5 border-b flex justify-between items-center bg-[#00C3CC]">
        <span className="font-bold text-lg pl-6 text-white">대화</span>
        <button
          onClick={() => {
            closeChat();
            onClose();
          }}
          className="pr-6"
        >
          <img src="chathide.png" />
        </button>
      </header>

      {/* ===== Content ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {channel ? (
          <ChatRoom channel={channel} />
        ) : (
          <>
            <ChatPokingSection />

            <div className="h-px bg-[#E1EDF0]" />

            <ChatList
              onSelect={(c) => {
                // 리스트 클릭 시도 동일하게 channelUrl로 통일
                useChatWidget.getState().openChat(c.url);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
