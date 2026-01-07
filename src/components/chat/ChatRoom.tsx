import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { BaseMessage, UserMessage } from "@sendbird/chat/message";
import { useUserStore } from "@/stores/useUserStore";
import { useChat } from "@/hooks/chat/useChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

function isUserMessage(m: BaseMessage): m is UserMessage {
  return m.messageType === "user";
}

export default function ChatRoom({ channel }: { channel: GroupChannel }) {
  const { messages, sendMessage } = useChat(channel);
  const myId = useUserStore((s) => s.user?.myId);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-1">
        {messages.filter(isUserMessage).map((m) => (
          <ChatMessage
            key={m.messageId}
            message={m}
            isMine={m.sender?.userId === String(myId)}
          />
        ))}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
