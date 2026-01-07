export default function ChatFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-0.25 right-42 w-100 h-15.5 rounded-tl-lg rounded-tr-lg bg-[#00C3CC] text-white font-bold shadow-lg z-9998"
    >
      <span className="flex ml-6 text-lg font-bold">
        대화 <img src="expand.svg" className="ml-72" />
      </span>
    </button>
  );
}
