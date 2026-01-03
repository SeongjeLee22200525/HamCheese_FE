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

      const formData = new FormData();

      if (profileImage) {
        // 사용자가 업로드한 이미지
        formData.append("profileImage", profileImage);
      } else {
        // 기본 프로필 이미지
        const defaultImageBlob = await fetch("/images/Ellipse.png").then((res) =>
          res.blob()
        );

        formData.append(
          "profileImage",
          defaultImageBlob,
          "default-profile.svg"
        );
      }

      formData.append("data", JSON.stringify(payload));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create`,
        formData
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
