import { useLayoutEffect, useEffect, useMemo, useRef } from "react";
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

function formatDate(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function isSameDay(a: number, b: number) {
  const da = new Date(a);
  const db = new Date(b);

  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

export default function ChatRoom({ channel }: { channel: GroupChannel }) {
  const { messages, sendMessage } = useChat(channel);
  const myId = useUserStore((s) => s.user?.myId);

  /* 상대 유저 */
  const otherUser = channel.members.find((m) => m.userId !== String(myId));

  /* metaData 캐스팅 */
  const meta = otherUser?.metaData as UserMetaData | undefined;

  // ✅ 1) 실제 스크롤되는 컨테이너 ref
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // ✅ 2) 맨 아래 앵커 ref
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ (선택) user 메시지만 렌더링하는 너의 기존 로직 유지
  const userMessages = useMemo(
    () => messages.filter(isUserMessage),
    [messages]
  );

  /** 🔥 맨 아래로 내리는 함수 (한 번에 끝내지 말고 2프레임 + scrollIntoView) */
  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    const scroller = scrollRef.current;
    const bottom = bottomRef.current;
    if (!scroller || !bottom) return;

    // 1) 가장 확실한 방식: 컨테이너 scrollTop 강제
    scroller.scrollTop = scroller.scrollHeight;

    // 2) 레이아웃이 늦게 커지는 케이스(이미지/폰트) 대비: 앵커로 한번 더
    bottom.scrollIntoView({ block: "end", behavior });
  };

  /**
   * ✅ 핵심: 메시지가 바뀌는 순간
   * - 렌더 직후(useLayoutEffect)
   * - 다음 프레임(raf)
   * - 그 다음 프레임(raf)  ← 이미지/폰트 때문에 높이가 한 프레임 더 늦는 경우가 많음
   */
  useLayoutEffect(() => {
    scrollToBottom("auto");

    const r1 = requestAnimationFrame(() => {
      scrollToBottom("auto");
      const r2 = requestAnimationFrame(() => {
        scrollToBottom("auto");
      });
      // cleanup
      return () => cancelAnimationFrame(r2);
    });

    return () => cancelAnimationFrame(r1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel.url, userMessages.length]);

  /**
   * ✅ 추가 안전장치: 채팅 영역 높이가 "나중에" 변할 때도(이미지 로드/폰트/줄바꿈)
   * ResizeObserver로 감지해서 맨 아래 유지
   */
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const ro = new ResizeObserver(() => {
      scrollToBottom("auto");
    });

    ro.observe(scroller);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel.url]);

  return (
    <div className="h-full flex-1 flex flex-col ">
      {/* ================= 상단 상대 프로필 ================= */}
      {otherUser && (
        <div className="px-10 py-10 border-b-2 border-[#E1EDF0] flex items-center gap-4">
          <a href={`/mateprofile/${otherUser.userId}`}>
            <img
              src={otherUser.profileUrl || "/profile.svg"}
              className="w-17 h-17 rounded-full object-cover"
              alt="profile"
            />
          </a>

          <div>
            <div className="font-bold text-lg text-[#222829] mb-2">
              {otherUser.nickname} 학부생
            </div>

            <div className="text-sm font-semibold text-[#838F91] flex gap-2">
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
      {/* ✅ 여기 ref가 제일 중요: 실제 스크롤 컨테이너에 달아야 함 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pl-6 pr-10 py-4 space-y-1"
      >
        {userMessages.map((m, idx, arr) => {
          const prev = arr[idx - 1];
          const next = arr[idx + 1];

          const isMine = m.sender?.userId === String(myId);

          const showDate = !prev || !isSameDay(prev.createdAt, m.createdAt);

          const isLastOfGroup =
            !next || next.sender?.userId !== m.sender?.userId;

          return (
            <div key={m.messageId}>
              {showDate && (
                <div className="flex justify-center mb-3">
                  <span className="px-4 py-2 text-sm font-medium text-[#838F91] ">
                    {formatDate(m.createdAt)}
                  </span>
                </div>
              )}

              <ChatMessage
                message={m}
                isMine={isMine}
                profileUrl={m.sender?.profileUrl}
                showProfile={!isMine && isLastOfGroup}
                showTime={isLastOfGroup}
              />
            </div>
          );
        })}

        {/* ✅ 맨 아래 앵커 (이게 있어야 scrollIntoView가 정확해짐) */}
        <div ref={bottomRef} />
      </div>

      {/* ================= 입력 ================= */}
      {/* ✅ 입력으로 보낼 때도 messages에 추가되면서 위 effect가 자동으로 내려줌 */}
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
