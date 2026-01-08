import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";

/**
 * Sendbird SDK 타입이 불완전해서
 * ReturnType<typeof SendbirdChat.init> 사용 ❌
 * → any or unknown으로 관리하는 게 정답
 */
let _sb: any = null;

export function getSendbird() {
  if (_sb) return _sb;

  const appId = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID;

  if (!appId) {
    console.error("❌ NEXT_PUBLIC_SENDBIRD_APP_ID is missing");
    throw new Error("Sendbird App ID is not defined");
  }

  _sb = SendbirdChat.init({
    appId,
    modules: [new GroupChannelModule()],
  });

  return _sb;
}
