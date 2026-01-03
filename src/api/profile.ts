import axios from "./axios";

export const checkUserEqual = async (
  myId: number,
  userId: number
): Promise<boolean> => {
  const res = await axios.get<boolean>(`/user/equal/${myId}/${userId}`);
  return res.data;
};

export const getMateProfile = async (userId: number) => {
  const res = await axios.get(`/user/mateProfile/${userId}`);
  return res.data;
};
