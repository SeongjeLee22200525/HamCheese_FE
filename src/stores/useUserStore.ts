import { create } from "zustand";

/**
 * 전역에서 사용할 유저 타입
 * - 로그인 직후: myId만 존재
 * - 회원가입 완료 후: myId + name
 */
export interface User {
  myId: number;
  name?: string;
}

interface UserStore {
  user: User | null;

  /** 로그인 / 회원가입 완료 시 */
  setUser: (user: User) => void;

  /** 로그아웃 시 */
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));
