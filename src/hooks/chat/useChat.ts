import { useEffect, useRef, useState } from "react";
import { sb } from "@/lib/sendbird/sendbird";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { BaseMessage } from "@sendbird/chat/message";

export function useChat(channel: GroupChannel | null) {
  const [messages, setMessages] = useState<BaseMessage[]>([]);

  // 🔑 현재 채널 ref (비동기 핸들러 안정화)
  const channelRef = useRef<GroupChannel | null>(null);

  useEffect(() => {
    if (!channel) return;

    channelRef.current = channel;
    setMessages([]); // 채널 바뀔 때 메시지 초기화

    // 1️⃣ 이전 메시지 로드
    channel
      .getMessagesByTimestamp(Date.now(), {
        prevResultSize: 50,
        nextResultSize: 0,
      })
      .then((msgs) => {
        // 오래된 → 최신 순으로 정렬
        setMessages(msgs.reverse());
      });

    // 2️⃣ 실시간 메시지 핸들러
    const handlerId = `chat-${channel.url}`;

    const handler = new GroupChannelHandler({
      onMessageReceived: (_, message) => {
        // 다른 채널에서 온 메시지 무시
        if (channelRef.current?.url !== channel.url) return;

        setMessages((prev) => {
          // 중복 메시지 방지
          if (prev.some((m) => m.messageId === message.messageId)) {
            return prev;
          }
          return [...prev, message];
        });
      },
    });

    sb.groupChannel.addGroupChannelHandler(handlerId, handler);

    // 3️⃣ cleanup (핸들러 중복 방지)
    return () => {
      sb.groupChannel.removeGroupChannelHandler(handlerId);
    };
  }, [channel]);

  // 4️⃣ 메시지 전송
  const sendMessage = (text: string) => {
    if (!channelRef.current) return;
    if (!text.trim()) return;

    channelRef.current
      .sendUserMessage({ message: text })
      .onSucceeded((msg) => {
        setMessages((prev) => {
          // optimistic update + 중복 방지
          if (prev.some((m) => m.messageId === msg.messageId)) {
            return prev;
          }
          return [...prev, msg];
        });
      })
      .onFailed((err) => {
        console.error("send message failed", err);
      });
  };

  return { messages, sendMessage };
}
