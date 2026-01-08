export default function ChatFab({
  onClick,
  hasUnread,
}: {
  onClick: () => void;
  hasUnread: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-15 right-20 w-13 h-13 rounded-full bg-[#00C3CC]
                 shadow-[0px_0px_8px_0px_rgba(225,237,240,1.00)]
                 z-9997 hover:bg-[#0FA4AB] active:bg-[#1A858A]
                 "
    >
      {/* 채팅 아이콘 */}
      <img src="/images/chat.svg" className="flex ml-2.75" />

      {/* 🔵 unread 파란 점 */}
      {hasUnread && (
        <span
          className="
            absolute top-2 right-2
            w-3 h-3 rounded-full
            bg-[#1A858A]
          "
        />
      )}
    </button>
  );
}
