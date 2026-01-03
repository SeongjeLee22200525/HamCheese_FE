import { create } from "zustand";

/**
 * 전역에서 사용할 유저 타입
 * - 로그인 직후: myId만 존재
 * - 회원가입 완료 후: myId + name
 */
export interface User {
  myId: string;
  name?: string;
  profileImageUrl?: string; // ✅ (선택) 프로필 이미지
}

interface UserStore {
  user: User | null;

  /** 로그인 / 회원가입 완료 시 */
  setUser: (user: User) => void;

  /** 로그아웃 시 */
  clearUser: () => void;

  /** 🔥 새로고침 시 쿠키로부터 복구 */
  hydrateUser: () => void;
}

/** 쿠키 유틸 */
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  hydrateUser: () => {
    const myId = getCookie("myId");
    if (!myId) return;

    const name = getCookie("name");

    set({
      user: {
        myId: Number(myId),
        name: name ? decodeURIComponent(name) : undefined,
      },
    });
  },
}));
