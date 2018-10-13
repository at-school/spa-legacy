import { Spin } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { compose, graphql } from "react-apollo";
import { getChatRoomMessageQuery as getChatroomMessageQuery } from "../../../../routes/Teacher/Messages/queries/queries";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";

class MessageContent extends React.Component<{
  selectedRoomId: string;
  getChatroomMessageQuery: {
    loading: boolean;
    message: Array<{
      Id: string;
      messageContent: string;
      senderAvatar: string;
      senderId: string;
    }>;
  };
  userId: string;
  setScrollingRef: (ref: any) => void;
}> {
  private scrollingRef: any;

  public componentDidUpdate(prevProps: any) {
    if (prevProps.selectedRoomId !== this.props.selectedRoomId) {
      this.scrollToBottom();
    } else if (
      JSON.stringify(prevProps.getChatroomMessageQuery) !==
      JSON.stringify(this.props.getChatroomMessageQuery)
    ) {
      this.scrollToBottom();
    }
  }

  public componentDidMount() {
    this.scrollToBottom(false)
  }

  public render() {
    return (
      <div className="chat-window-message-container">
        {(() => {
          if (
            this.props.getChatroomMessageQuery.loading &&
            !this.props.getChatroomMessageQuery.message
          ) {
            return (
              <div className={css(styles.centerSpinner)}>
                <Spin />
              </div>
            );
          }
          const messages = this.props.getChatroomMessageQuery.message || [];

          return (
            <div>
              {messages.map(message => {
                if (message.senderId === this.props.userId) {
                  return (
                    <MessageSent
                      key={message.Id}
                      content={message.messageContent}
                    />
                  );
                }
                return (
                  <MessageReceived
                    key={message.Id}
                    avatar={message.senderAvatar}
                    content={message.messageContent}
                  />
                );
              })}
              <div ref={this.setScrollingRef} />
            </div>
          );
        })()}
      </div>
    );
  }
  private setScrollingRef = (ref: any) => (this.scrollingRef = ref);

  private scrollToBottom = (smooth = true) => {
    if (this.scrollingRef) {
      this.scrollingRef.scrollIntoView({
        behavior: smooth ? "smooth" : "instant"
      });
    }
  };
}

const styles = StyleSheet.create({
  centerSpinner: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default compose(
  graphql(getChatroomMessageQuery, {
    options: (props: { selectedRoomId: string }) => ({
      variables: { chatroomId: props.selectedRoomId }
    }),
    name: "getChatroomMessageQuery"
  })
)(MessageContent);
