import React from "react";

const MessageContext = React.createContext({} as IMessageProviderStore);

interface IMessageProviderStore {
  messageList: IMessageItem[]
}

interface IMessageItem {
  self: boolean;
  senderAvatar: null;
  content: string;
}

export default MessageContext;
