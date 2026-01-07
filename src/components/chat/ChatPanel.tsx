import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

type Props = {
  channel: GroupChannel | null;
  onSelect: (c: GroupChannel) => void;
  onClose: () => void;
};

export default function ChatPanel({ channel, onSelect, onClose }: Props) {
  return (
    <div className="fixed bottom-px right-42 w-100 h-140 bg-white rounded-tl-lg rounded-tr-lg shadow-[0px_-2px_20px_0px_rgba(225,237,240,1.00)] z-9999 flex flex-col">
      <header className="rounded-tl-lg rounded-tr-lg h-15.5 border-b flex justify-between bg-[#00C3CC]">
        <span className="font-bold  text-lg pl-6 pt-5">대화</span>
        <button onClick={onClose}>
          <img src="chathide.png" className="pr-6"></img>
        </button>
      </header>

      {channel ? (
        <ChatRoom channel={channel} />
      ) : (
        <ChatList onSelect={onSelect} />
      )}
    </div>
  );
}
