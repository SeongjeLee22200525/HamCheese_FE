import axios from "@/api/axios";

/**
 * 조각 건네기
 * POST /poking/user/{userId}/{myId}
 */
export async function sendPoking(userId: number, myId: number) {
  await axios.post(`/poking/user/${userId}/${myId}`);
}
