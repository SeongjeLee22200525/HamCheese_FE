"use client";

import { useState } from "react";
import axios from "axios";
import { SignUpRequest } from "@/types/user";

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (
    payload: SignUpRequest,
    profileImage?: File | null
  ) => {
    try {
      setLoading(true);
      setError(null);

      // 🔍 payload 확인
      console.log("🟢 signup payload", payload);

      const formData = new FormData();

      // 🔥 핵심: File일 때만 서버로 전송
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // 유저 데이터
      formData.append("data", JSON.stringify(payload));

      // 🔍 FormData 내부 확인
      for (const [key, value] of formData.entries()) {
        console.log("🟡 formData:", key, value);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create`,
        formData,
        {
          headers: {
            // boundary는 axios가 자동으로 설정
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data; // { myId, name }
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
