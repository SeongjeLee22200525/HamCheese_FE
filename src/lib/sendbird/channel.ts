import { sb } from "./sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

/**
 * 1:1 채널을 가져오거나 없으면 생성
 * - isDistinct = true → 항상 동일한 1:1 채널
 * - myId / targetId 순서 상관 없음
 * - 이미 채널이 있으면 기존 채널 반환
 */
export async function getOrCreateChannel(
  myId: string,
  targetId: string
): Promise<GroupChannel> {
  // 1️⃣ 현재 유저로 Sendbird 연결
  // (이미 연결되어 있어도 안전)
  await sb.connect(myId);

  // 2️⃣ 1:1 채널 생성 or 재사용
  const channel = await sb.groupChannel.createChannel({
    invitedUserIds: [targetId],
    isDistinct: true, // 🔥 1:1 DM 핵심
  });

  return channel;
}

/**
 * 채널 URL로 기존 GroupChannel 가져오기
 * - 채팅방 리스트 클릭 시 사용
 * - 새로고침 / 직접 접근 대응
 */
export async function getGroupChannel(
  channelUrl: string
): Promise<GroupChannel> {
  const channel = await sb.groupChannel.getChannel(channelUrl);
  return channel;
}

/**
 * 내가 참여한 모든 채팅방 목록 가져오기
 * - 카톡 "채팅 리스트" 용
 */
export async function getMyChannels(limit = 20): Promise<GroupChannel[]> {
  const query = sb.groupChannel.createMyGroupChannelListQuery({
    includeEmpty: true,
    limit,
  });

  const channels = await query.next();
  return channels;
}

/**
 * (개발/테스트용)
 * 여러 명이 참여하는 그룹 채널 생성
 * - 실서비스에서는 거의 안 쓰고
 * - 다중 채팅방 테스트용
 */
export async function createGroupChannel(
  myId: string,
  invitedUserIds: string[],
  name?: string
): Promise<GroupChannel> {
  await sb.connect(myId);

  const channel = await sb.groupChannel.createChannel({
    invitedUserIds,
    isDistinct: false,
    name,
  });

  return channel;
}
