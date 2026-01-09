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
      <img src="/images/chat.svg" className="flex ml-3.5 w-6" />

      {/*  unread 빨간 점 */}
      {hasUnread && (
        <span
          className="
            absolute top-0.5 left-10
            w-3.75 h-3.75 rounded-full
            bg-[#FF5454]
          "
        />
      )}
    </button>
  );
}
