import React from "react";

const MessageContext = React.createContext({} as IMessageProviderStore);

interface IMessageProviderStore {
  messageList: IMessageItem[];
}

interface IMessageItem {
  self: boolean;
  senderAvatar: null;
  content: string;
}

export const withMessageContext = (Component: any) => (props: any) => (
  <MessageContext.Consumer>
    {value => <Component messageContext={{ ...value }} {...props} />}
  </MessageContext.Consumer>
);

export default MessageContext;
