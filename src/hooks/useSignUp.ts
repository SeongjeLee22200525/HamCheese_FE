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

      // 🔍 디버깅: payload 확인
      console.log("🟢 signup payload", payload);
      console.log("🟢 email:", payload.email);
      console.log("🟢 socialId:", payload.socialId);

      const formData = new FormData();

      if (profileImage) {
        formData.append("profileImage", profileImage);
      } else {
        const defaultImageBlob = await fetch("/images/Ellipse.png").then(
          (res) => res.blob()
        );

        formData.append(
          "profileImage",
          defaultImageBlob,
          "default-profile.png"
        );
      }

      formData.append("data", JSON.stringify(payload));

      // 🔍 FormData 내부 확인 (중요)
      for (const [key, value] of formData.entries()) {
        console.log("🟡 formData:", key, value);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create`,
        formData,
        {
          headers: {
            // ❗ axios가 boundary 자동 설정하게 두는 게 맞음
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data; // { myId, name }
    } catch (e: any) {
      setError("회원가입 실패");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
