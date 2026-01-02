import { useState } from "react";
import { SignUpRequest } from "@/types/user";
// import { signUp } from "@/api/user";
import { signUpMock as signUp } from "@/api/user.mock";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (form: SignUpRequest) => {
    try {
      setLoading(true);
      setError(null);
      await signUp(form);
    } catch (e) {
      console.error(e);
      setError("회원가입에 실패했습니다.");
      // ❌ throw new Error() 제거
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};
