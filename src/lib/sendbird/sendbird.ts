import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";

export const sb = SendbirdChat.init({
  appId: process.env.NEXT_PUBLIC_SENDBIRD_APP_ID!,
  modules: [new GroupChannelModule()],
});
