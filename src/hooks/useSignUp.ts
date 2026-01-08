"use client";

import { useState } from "react";
import axios from "axios";
import { SignUpRequest } from "@/types/user";
import { sb } from "@/lib/sendbird/sendbird";

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: SignUpRequest, profileImage?: File | null) => {
    try {
      setLoading(true);
      setError(null);

      console.log("🟢 signup payload", payload);

      const formData = new FormData();

      // 🔥 프로필 이미지 (있을 때만)
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // 유저 데이터
      formData.append("data", JSON.stringify(payload));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = res.data; // { myId, name, imageUrl? }

      /* ================= Sendbird 유저 생성 / 기본 프로필 ================= */
      try {
        // 혹시 남아있는 세션 정리
        try {
          await sb.disconnect();
        } catch {}

        await sb.connect(String(result.myId));

        await sb.updateCurrentUserInfo({
          nickname: result.name,
          profileUrl: result.imageUrl || "/profile.svg",
        });
      } catch (e) {
        console.error("❌ Sendbird signup sync failed", e);
      }

      return result;
    } catch (e: any) {
      console.error("❌ signup error", e);
      setError("회원가입 실패");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
