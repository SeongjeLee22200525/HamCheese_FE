// src/api/user.ts
import axios from "./axios";
import { SignUpRequest, SignUpResponse } from "@/types/user";

/* =========================
 * 회원가입
 * ========================= */
export const signUp = async (
  payload: SignUpRequest
): Promise<SignUpResponse> => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  const res = await axios.post<SignUpResponse>("/user/signUp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/* =========================
 * 마이 프로필 여부 확인
 * GET /user/equal/{myId}/{userId}
 * ========================= */
export const checkIsMyProfile = async (
  myId: number,
  userId: number
): Promise<boolean> => {
  const res = await axios.get<boolean>(`/user/equal/${myId}/${userId}`);
  return res.data;
};
