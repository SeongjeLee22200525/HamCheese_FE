import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { BaseMessage, UserMessage } from "@sendbird/chat/message";
import { useUserStore } from "@/stores/useUserStore";
import { useChat } from "@/hooks/chat/useChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

/* ================= 타입 가드 ================= */
function isUserMessage(m: BaseMessage): m is UserMessage {
  return m.messageType === "user";
}

/* ================= Sendbird User Meta 타입 ================= */
type UserMetaData = {
  studentId?: string;
  major1?: string;
  major2?: string;
};

export default function ChatRoom({ channel }: { channel: GroupChannel }) {
  const { messages, sendMessage } = useChat(channel);
  const myId = useUserStore((s) => s.user?.myId);

  /* 상대 유저 */
  const otherUser = channel.members.find((m) => m.userId !== String(myId));

  /* metaData 캐스팅 (🔥 핵심) */
  const meta = otherUser?.metaData as UserMetaData | undefined;

  return (
    <div className="flex-1 flex flex-col">
      {/* ================= 상단 상대 프로필 ================= */}
      {otherUser && (
        <div className="px-10 py-10 border-b border-[#E1EDF0] flex items-center gap-4">
          <img
            src={otherUser.profileUrl || "/profile.svg"}
            className="w-17 h-17 rounded-full object-cover"
            alt="profile"
          />

          <div>
            <div className="font-bold text-lg text-[#222829] mb-2">
              {otherUser.nickname}
            </div>

            <div className="text-sm font-semibold  text-[#838F91] flex gap-2">
              {meta?.studentId && (
                <span className="bg-[#F5F8F8] rounded p-2">
                  {meta.studentId}학번
                </span>
              )}

              {meta?.major1 && (
                <span className="bg-[#F5F8F8] rounded text-[#0FA4AB] p-2">
                  {meta.major1}
                </span>
              )}

              {meta?.major2 && (
                <span className="bg-[#F5F8F8] rounded text-[#0FA4AB] p-2">
                  {meta.major2}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= 메시지 리스트 ================= */}
      <div className="flex-1 overflow-y-auto px-10 pt-4 space-y-1">
        {messages.filter(isUserMessage).map((m, idx, arr) => {
          const next = arr[idx + 1];

          const isMine = m.sender?.userId === String(myId);

          // 🔥 같은 사람이 다음 메시지를 보냈는지
          const isLastOfGroup =
            !next || next.sender?.userId !== m.sender?.userId;

          return (
            <ChatMessage
              key={m.messageId}
              message={m}
              isMine={isMine}
              profileUrl={m.sender?.profileUrl}
              showProfile={!isMine && isLastOfGroup}
              showTime={isLastOfGroup}
            />
          );
        })}
      </div>

      {/* ================= 입력 ================= */}
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
