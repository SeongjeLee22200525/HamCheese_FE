// src/api/profile.ts
import axios from "@/api/axios";

/* ===== 링크 정규화 유틸 ===== */
function normalizeLink(link?: string | null): string | null {
  if (!link) return null;

  try {
    const url = new URL(link);
    return url.href;
  } catch {
    return null;
  }
}
/**
 * 메이트 프로필 조회
 */
export async function getMateProfile(userId: number) {
  const res = await axios.get(`/user/mateProfile/${userId}`);
  const data = res.data ?? {};
  console.log("🔥 raw activity:", data.activity);

  return {
    ...data,

    // 🔥 숫자 정규화
    gpa:
      data.gpa !== null && data.gpa !== undefined
        ? Number(data.gpa)
        : undefined,

    grade:
      data.grade !== null && data.grade !== undefined
        ? Number(data.grade)
        : undefined,

    // 배열 정규화
    skillList: Array.isArray(data.skillList) ? data.skillList : [],
    activity: Array.isArray(data.activity)
      ? data.activity.map((a: any) => ({
          ...a,
          link: normalizeLink(a.link),
        }))
      : [],

    // 동료평가
    peerGoodKeyword: data.peerGoodKeyword ?? {},
    peerBadKeyword: data.peerBadKeyword ?? {},
    goodKeywordCount: data.goodKeywordCount ?? 0,
    badKeywordCount: data.badKeywordCount ?? 0,
  };
}

/**
 * 본인 여부 체크
 */
export async function checkUserEqual(myId: number, targetUserId: number) {
  const res = await axios.get(`/user/equal/${myId}/${targetUserId}`);
  return Boolean(res.data);
}
