import { create } from "zustand";

type ChatWidgetState = {
  isOpen: boolean;
  currentChannelUrl: string | null;
  openChat: (channelUrl: string) => void;
  closeChat: () => void;
};

export const useChatWidget = create<ChatWidgetState>((set) => ({
  isOpen: false,
  currentChannelUrl: null,

  openChat: (channelUrl) =>
    set({ isOpen: true, currentChannelUrl: channelUrl }),

  closeChat: () => set({ isOpen: false, currentChannelUrl: null }),
}));
