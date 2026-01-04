import { create } from "zustand";

/**
 * 전역에서 사용할 유저 타입
 */
export interface User {
  myId: number;
  name?: string;
  profileImageUrl?: string | null;
}

interface UserStore {
  user: User | null;

  /** 로그인 / 회원가입 완료 시 */
  setUser: (user: User) => void;

  /** 로그아웃 시 */
  clearUser: () => void;

  /** 새로고침 시 쿠키로부터 복구 */
  hydrateUser: () => void;
}

/** 쿠키 유틸 */
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  hydrateUser: () => {
  const myId = getCookie("myId");
  const name = getCookie("name");

  console.log("💧 hydrateUser called", { myId, name });

  if (!myId) {
    set({ user: null });
    return;
  }

  set({
    user: {
      myId: Number(myId),
      name: name ? decodeURIComponent(name) : undefined,
    },
  });
},

}));
