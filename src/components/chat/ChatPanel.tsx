import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import ChatPokingSection from "./ChatPokingSection";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

type Props = {
  channel: GroupChannel | null;
  onSelect: (c: GroupChannel) => void;
  onClose: () => void;
};

export default function ChatPanel({ channel, onSelect, onClose }: Props) {
  return (
    <div className="fixed bottom-px right-42 w-100 h-140 bg-white rounded-tl-lg rounded-tr-lg shadow-[0px_-2px_20px_0px_rgba(225,237,240,1.00)] z-9999 flex flex-col">
      {/* ===== Header ===== */}
      <header className="rounded-tl-lg rounded-tr-lg h-15.5 border-b flex justify-between items-center bg-[#00C3CC]">
        <span className="font-bold text-lg pl-6 text-white">대화</span>
        <button onClick={onClose} className="pr-6">
          <img src="chathide.png" />
        </button>
      </header>

      {/* ===== Content ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {channel ? (
          /* 채팅방 */
          <ChatRoom channel={channel} />
        ) : (
          <>
            {/* 🔔 나에게 온 찌르기 */}
            <ChatPokingSection />

            {/* 구분선 */}
            <div className="h-px bg-[#E1EDF0]" />

            {/* 채팅 리스트 */}
            <ChatList onSelect={onSelect} />
          </>
        )}
      </div>
    </div>
  );
}
