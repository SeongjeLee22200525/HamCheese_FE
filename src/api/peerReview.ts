// src/api/peerReview.ts

import axios from "@/api/axios";
import { PeerReviewSubmitPayload } from "@/components/mateprofile/peerReviewModal/PeerReviewForm";

/**
 * 서버 명세서 기준 Payload
 * POST /peerReview/{myId}/{userId}
 */
export type PeerReviewApiPayload = {
  startDate: string; // "YYYY-MM" or "YYYY"
  meetSpecific: string;
  goodKeywordList: string[];
  badKeywordList: string[];
};

/**
 * 동료평가 제출
 * @param myId 평가 작성자 ID
 * @param userId 평가 대상자 ID
 * @param payload 프론트(UI)용 payload
 */
export async function submitPeerReview(
  myId: number,
  userId: number,
  payload: PeerReviewSubmitPayload
) {
  // 🔁 UI payload → 서버 payload 변환
  const apiPayload: PeerReviewApiPayload = {
    startDate: payload.startedMonth
      ? `${payload.startedYear}-${payload.startedMonth.padStart(2, "0")}`
      : payload.startedYear,
    meetSpecific: payload.meetWhere,
    goodKeywordList: payload.goodKeys,
    badKeywordList: payload.badKeys,
  };

  // 🔍 디버깅 로그
  console.log("📦 submitPeerReview");
  console.log("➡️ myId:", myId);
  console.log("➡️ userId:", userId);
  console.log("➡️ body:", apiPayload);

  const res = await axios.post(`/peerReview/${myId}/${userId}`, apiPayload);

  return res.data;
}
