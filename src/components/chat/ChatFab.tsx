export default function ChatFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-15 right-20 w-13 h-13 rounded-full bg-[#00C3CC] shadow-[0px_0px_8px_0px_rgba(225,237,240,1.00)] z-9998 hover:bg-[#0FA4AB] active:bg-[#1A858A]"
    >
      <img src="images/chat.svg" className="flex ml-2.75" />
    </button>
  );
}
