import { Icon, Popconfirm } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { compose, graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withAppContext } from "../../../../../../contexts/AppContext";
import { withTeacherMessageSocket } from "../../../../../../contexts/Teacher/TeacherMessageSocket";
import {
  getChatRoomQuery,
  removeChatroomMutation
} from "../../../queries/queries";

class ChatroomOptions extends React.Component<any> {
  public onDeleteChatroom = () => {
    // get the current selected room and next room
    const Id = this.props.match.params.id;
    const { chatrooms } = this.props.teacherMessageSocket;
    const currentRoomIndex = chatrooms.findIndex((room: any) => room.Id === Id);
    let roomToRedirect = "";
    if (currentRoomIndex === 0) {
      roomToRedirect = chatrooms[1].Id;
    } else {
      roomToRedirect = chatrooms[currentRoomIndex - 1].Id;
    }

    this.props.removeChatroomMutation({
      variables: { Id },
      update: (cache: any) => {
        const data = cache.readQuery({
          query: getChatRoomQuery,
          variables: { Id: this.props.appContext.userId }
        });

        if (data && data.user && data.user.length === 1) {
          // notify other user of the deletion
          const currentChatroom = data.user[0].chatrooms.find(
            (chatroom: any) => chatroom.Id === Id
          );
          const otherUser = currentChatroom.users.find(
            (user: any) => user.Id !== this.props.appContext.userId
          ).Id;
          this.props.appContext.socket.emit("user", {
            activityType: "deleteChatroom",
            otherUser,
            chatroomId: Id
          });
          // change the cache
          data.user[0].chatrooms = data.user[0].chatrooms.filter(
            (chatroom: any) => chatroom.Id !== Id
          );
        }
        cache.writeQuery({
          query: getChatRoomQuery,
          variables: { Id: this.props.appContext.userId },
          data
        });
        this.props.history.push("/teacher/messages/" + roomToRedirect);
      }
    });
  };

  public render() {
    return (
      <div className={css(styles.mainContainer)}>
        <div className={css(styles.editChatroomContainer)}>
          <Icon
            className={css(styles.editChatroomIcon)}
            type="edit"
            theme="outlined"
          />
          <span>Edit name of the room</span>
        </div>
        <div className={css(styles.editChatroomContainer)}>
          <Popconfirm
            title="Are you sure delete this conversation permanently?"
            onConfirm={this.onDeleteChatroom}
            okText="Yes"
            cancelText="No"
            placement="bottom"
          >
            <Icon
              className={css(styles.editChatroomIcon)}
              type="delete"
              theme="outlined"
            />
            <span>Remove conversation</span>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10
  },
  editChatroomContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    cursor: "pointer"
  },
  editChatroomIcon: {
    marginRight: 10
  }
});

export default compose(
  graphql(removeChatroomMutation, { name: "removeChatroomMutation" })
)(withRouter(withTeacherMessageSocket(withAppContext(ChatroomOptions as any))));
