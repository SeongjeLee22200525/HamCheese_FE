import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import ChatPokingSection from "./ChatPokingSection";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { getGroupChannel } from "@/lib/sendbird/channel";
import { useChatWidget } from "@/hooks/chat/useChatWidget";
import AlarmHandler from "./AlarmHandler";
import ChatSnackbar from "@/components/chat/ChatSnackbar";

type Props = {
  onClose: () => void;
  onAcceptSuccess?: () => void;
  onRejectSuccess?: () => void;
};

export default function ChatPanel({
  onClose,
  onAcceptSuccess,
  onRejectSuccess,
}: Props) {
  const { currentChannelUrl, closeChat } = useChatWidget();
  const [channel, setChannel] = useState<GroupChannel | null>(null);
  const [snackbarMsg, setSnackbarMsg] = useState<string | null>(null);

  /* channelUrl → GroupChannel */
  useEffect(() => {
    if (!currentChannelUrl) {
      setChannel(null);
      return;
    }

    let alive = true;

    getGroupChannel(currentChannelUrl).then((ch) => {
      if (alive) setChannel(ch);
    });

    return () => {
      alive = false;
    };
  }, [currentChannelUrl]);

  return (
    <div className="w-225 h-full bg-white  flex text-[#222829] relative">
      {/* ================= 왼쪽 영역 ================= */}
      <div className="w-84 bg-[#E0EDEF] h-full flex flex-col">
        {/* 헤더 */}
        <div className="mt-10 mx-10">
          <button
            onClick={() => {
              closeChat();
              onClose();
            }}
          >
            <img src="/chatclose.svg" />
          </button>

          <div className="text-lg font-bold mt-6 mb-9">나의 채팅 내역</div>
        </div>
        <div className="bg-[#E1EDF0] text-sm border-b-2 border-[#CEDBDE]">
          <AlarmHandler />
        </div>

        {/* 찌르기 */}
        <div>
          <ChatPokingSection
            onAcceptSuccess={() =>
              setSnackbarMsg(
                "상대방의 대화 신청을 수락했어요!\n이제 채팅을 시작할 수 있어요."
              )
            }
            onRejectSuccess={() =>
              setSnackbarMsg("상대방의 대화 신청을 거절했어요.")
            }
          />
        </div>

        {/* 채팅 리스트 */}
        <div className="flex-1 overflow-y-auto">
          <ChatList
            currentChannelUrl={currentChannelUrl}
            onSelect={(c) => {
              useChatWidget.getState().openChat(c.url);
            }}
          />
        </div>
      </div>

      {/* ================= 오른쪽 영역 ================= */}
      <div className="flex-1 h-full">
        {channel ? (
          <ChatRoom channel={channel} />
        ) : (
          <div className="h-full flex items-center justify-center text-[#B7C4C7] font-medium">
            대화를 선택해주세요
          </div>
        )}
      </div>
      {snackbarMsg && (
        <ChatSnackbar
          message={snackbarMsg}
          onClose={() => setSnackbarMsg(null)}
        />
      )}
    </div>
  );
}
