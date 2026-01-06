import { create } from "zustand";
import axios from "@/api/axios";

/**
 * 전역에서 사용할 유저 타입
 */
export interface User {
  myId: number;
  name?: string;
  profileImageUrl?: string | null;
}

/** 기본 프로필 이미지 */
const DEFAULT_PROFILE_IMAGE = "/images/profile.svg";

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

  /** 로그인 / 회원가입 시 */
  setUser: (user) =>
    set({
      user: {
        ...user,
        profileImageUrl: user.profileImageUrl ?? DEFAULT_PROFILE_IMAGE,
      },
    }),

  /** 로그아웃 */
  clearUser: () => set({ user: null }),

  /** 새로고침 시 쿠키로 복구 */
  hydrateUser: async () => {
    const myId = getCookie("myId");
    const name = getCookie("name");

    console.log("💧 hydrateUser called", { myId, name });

    if (!myId) {
      set({ user: null });
      return;
    }

    try {
      // ✅ 서버에서 최신 프로필 정보 조회
      const res = await axios.get(`/user/myProfile/${myId}`);
      const data = res.data;

      set({
        user: {
          myId: Number(myId),
          name: data.name ?? (name ? decodeURIComponent(name) : undefined),
          profileImageUrl: data.imageUrl || DEFAULT_PROFILE_IMAGE,
        },
      });
    } catch (e) {
      console.error("❌ hydrateUser profile fetch error", e);

      // ❗ 서버 오류 시에도 최소 정보는 유지
      set({
        user: {
          myId: Number(myId),
          name: name ? decodeURIComponent(name) : undefined,
          profileImageUrl: DEFAULT_PROFILE_IMAGE,
        },
      });
    }
  },
}));
