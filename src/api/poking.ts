import axios from "@/api/axios";

/**
 *  유저 기준 찌르기 가능 여부 (유일한 판단 기준)
 * GET /poking/canInRecruiting/{userId}/{myId}
 */
export async function checkCanPoke(
  userId: number,
  myId: number
): Promise<{ canPoke: boolean; reason: string }> {
  const res = await axios.get(`/poking/canInProfile/${userId}/${myId}`);
  return res.data;
}

/**
 *  프로필에서 찌르기
 * POST /poking/user/{userId}/{myId}
 */
export async function sendPoking(userId: number, myId: number) {
  await axios.post(`/poking/user/${userId}/${myId}`);
}

/**
 *  모집글에서 찌르기 생성
 * POST /poking/{recruitingId}/{myId}
 */
export async function sendPokingInRecruiting(
  recruitingId: number,
  myId: number
) {
  await axios.post(`/poking/${recruitingId}/${myId}`);
}

/**
 *  모집글 기준 찌르기 가능 여부 조회
 * GET /poking/canInRecruiting/{recruitingId}/{myId}
 */
export async function checkCanPokeInRecruiting(
  recruitingId: number,
  myId: number
): Promise<{ canPoke: boolean; reason: string }> {
  const res = await axios.get(
    `/poking/canInRecruiting/${recruitingId}/${myId}`
  );
  return res.data;
}
