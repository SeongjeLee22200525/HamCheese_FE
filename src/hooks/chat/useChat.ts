import { useEffect, useRef, useState } from "react";
import { getSendbird } from "@/lib/sendbird/sendbird";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { BaseMessage } from "@sendbird/chat/message";
import { useUserStore } from "@/stores/useUserStore";

export function useChat(channel: GroupChannel | null) {
  const [messages, setMessages] = useState<BaseMessage[]>([]);
  const channelRef = useRef<GroupChannel | null>(null);
  const sb = getSendbird();
  useEffect(() => {
    if (!channel) return;

    let alive = true;
    channelRef.current = channel;
    setMessages([]);

    const init = async () => {
      try {
        /* 1️⃣ Sendbird 연결 보장 */
        if (!sb.currentUser) {
          const myId = useUserStore.getState().user?.myId;
          if (!myId) return;
          await sb.connect(String(myId));
        }

        if (!alive) return;

        /* 2️⃣ 채널 멤버 여부 확인 */
        const isMember = channel.members.some(
          (m) => m.userId === sb.currentUser?.userId
        );

        /* 3️⃣ 멤버 아니면 join */
        if (!isMember) {
          await channel.join();
        }

        if (!alive) return;

        /* 4️⃣ unread 즉시 제거 */
        channel.markAsRead();

        /* 5️⃣ 이전 메시지 로드 */
        const msgs = await channel.getMessagesByTimestamp(Date.now(), {
          prevResultSize: 50,
          nextResultSize: 0,
        });

        if (!alive) return;
        setMessages(msgs);
      } catch (e) {
        console.error("❌ useChat init error", e);
      }
    };

    init();

    /* 6️⃣ 실시간 메시지 핸들러 */
    const handlerId = `chat-${channel.url}`;
    const handler = new GroupChannelHandler({
      onMessageReceived: (_, message) => {
        if (channelRef.current?.url !== channel.url) return;

        setMessages((prev) =>
          prev.some((m) => m.messageId === message.messageId)
            ? prev
            : [...prev, message]
        );
        channelRef.current.markAsRead();
      },
    });

    sb.groupChannel.addGroupChannelHandler(handlerId, handler);

    return () => {
      alive = false;
      sb.groupChannel.removeGroupChannelHandler(handlerId);
    };
  }, [channel]);

  /* ================= 메시지 전송 ================= */
  const sendMessage = (text: string) => {
    if (!channelRef.current) return;
    if (!text.trim()) return;

    channelRef.current
      .sendUserMessage({ message: text })
      .onSucceeded((msg) => {
        setMessages((prev) =>
          prev.some((m) => m.messageId === msg.messageId)
            ? prev
            : [...prev, msg]
        );
      })
      .onFailed((err) => {
        console.error("send message failed", err);
      });
  };

  return { messages, sendMessage };
}
