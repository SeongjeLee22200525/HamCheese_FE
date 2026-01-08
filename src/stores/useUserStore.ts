import { create } from "zustand";
import axios from "@/api/axios";

export interface User {
  myId: number;
  name?: string;
  profileImageUrl?: string | null;
}

const DEFAULT_PROFILE_IMAGE = "/images/profile.svg";

interface UserStore {
  user: User | null;

  /** ✅ hydration 완료 여부 */
  hydrated: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;

  /** 새로고침 시 쿠키로부터 복구 */
  hydrateUser: () => Promise<void>;
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
  hydrated: false,

  setUser: (user) =>
    set({
      user: {
        ...user,
        profileImageUrl: user.profileImageUrl ?? DEFAULT_PROFILE_IMAGE,
      },
      hydrated: true, // ✅ 로그인 직후도 hydrated 처리
    }),

  clearUser: () => set({ user: null, hydrated: true }), // ✅ 로그아웃도 판단 완료 상태

  hydrateUser: async () => {
    try {
      const myId = getCookie("myId");
      const name = getCookie("name");

      console.log("💧 hydrateUser called", { myId, name });

      if (!myId) {
        set({ user: null, hydrated: true }); // ✅ 여기서도 hydrated true
        return;
      }

      // ✅ 서버에서 최신 프로필 정보 조회
      const res = await axios.get(`/user/myProfile/${myId}`);
      const data = res.data;

      set({
        user: {
          myId: Number(myId),
          name: data.name ?? (name ? decodeURIComponent(name) : undefined),
          profileImageUrl: data.imageUrl || DEFAULT_PROFILE_IMAGE,
        },
        hydrated: true,
      });
    } catch (e) {
      console.error("❌ hydrateUser profile fetch error", e);

      // ❗ 서버 오류 시에도 최소 정보는 유지
      const myId = getCookie("myId");
      const name = getCookie("name");

      set({
        user: myId
          ? {
              myId: Number(myId),
              name: name ? decodeURIComponent(name) : undefined,
              profileImageUrl: DEFAULT_PROFILE_IMAGE,
            }
          : null,
        hydrated: true,
      });
    }
  },
}));
