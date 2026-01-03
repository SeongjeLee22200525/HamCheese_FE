// src/api/peerReview.ts
import axios from "./axios";

export type PeerReviewRequest = {
  startedAt: string;
  meetWhere: string;
  peerGoodKeyword: string[];
  peerBadKeyword: string[];
};

export async function submitPeerReview(
  targetUserId: number,
  payload: PeerReviewRequest
) {
  await axios.post(`/peer-review/${targetUserId}`, payload);
}
