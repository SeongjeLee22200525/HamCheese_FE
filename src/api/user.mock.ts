import axios from "./axios";
import { SignUpRequest, SignUpResponse } from "@/types/user";

export const signUpMock = async (
  payload: SignUpRequest
): Promise<SignUpResponse> => {
  const { profileImage, grade, semester, gpa, ...rest } = payload;

  const body = {
    ...rest,
    ...(grade !== undefined && { grade }),
    ...(semester !== undefined && { semester }),
    ...(gpa !== undefined && { gpa }),
  };

  console.log("MOCK SIGNUP PAYLOAD", body);

  const res = await axios.post("/users", body);

  return {
    userId: Number(res.data.id),
    name: res.data.name,
  };
};
