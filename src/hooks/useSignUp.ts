
import { useState } from "react";
import { signUp } from "@/api/user";
import { SignUpRequest } from "@/types/user";

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (form: SignUpRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await signUp(form);

      console.log("회원가입 성공:", res);
      return res;
    } catch (e) {
      console.error(e);
      setError("회원가입에 실패했습니다.");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
