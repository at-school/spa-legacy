import { AutoComplete, Avatar, Icon, Input } from "antd";
import React from "react";
import { searchUsers } from "../../../../api/message";
import AppContent from "../../../../contexts/AppContext";

const MessageContent = ({
  messageData,
  addChatRoomVisible,
  selectAddChatRoomUser,
  addNewRoom,
  sendMessage
}: any) => (
  <div className="message-content-container">
    {addChatRoomVisible ? (
      <AppContent.Consumer>
        {value => (
          <AddChatRoom
            addNewRoom={addNewRoom}
            token={value.token!}
            selectAddChatRoomUser={selectAddChatRoomUser}
          />
        )}
      </AppContent.Consumer>
    ) : (
      <div className="message-content">
        <div className="message-content-details">
          <MessageContentDetailsContainer messageData={messageData} />
        </div>
        <div className="message-content-input">
          <Input.TextArea autosize={{ minRows: 1, maxRows: 3 }} />
          <div className="message-content-input-icons">
            <Icon style={{ fontSize: "18px" }} type="smile-o" />
            <Icon
              onClick={sendMessage}
              style={{ fontSize: "18px" }}
              type="up-circle"
            />
          </div>
        </div>
      </div>
    )}
  </div>
);

const MessageContentDetailsContainer = ({ messageData }: any) => (
  <div className="message-content-details-container">
    {messageData.map((message: any) => (
      <MessageContentItem
        className={message.self ? " self" : ""}
        content={message.content}
      />
    ))}
  </div>
);

const MessageContentItem = ({ content, className }: any) => (
  <div className={"message-item" + className}>
    <div className="message-item-avatar">
      <Avatar icon="user" />
    </div>
    <div className="message-item-content">{content}</div>
  </div>
);

class AddChatRoom extends React.Component<
  { token: string; selectAddChatRoomUser: any; addNewRoom: any },
  { dataSource: any }
> {
  public state = {
    dataSource: []
  };

  public onSearch = (searchPattern: string) => {
    if (searchPattern.length === 0) {
      this.setState({ dataSource: [] });
    } else {
      searchUsers(searchPattern, this.props.token).then(res =>
        this.setState({ dataSource: res.results })
      );
    }
  };

  public onSelect = (value: any) => {
    console.log(value);
    this.props.selectAddChatRoomUser(value);
  };

  public render() {
    return (
      <div className="add-chatroom">
        <div className="add-chatroom-content-container">
          <div>To:</div>
          <AutoComplete
            dataSource={this.state.dataSource.map((data: any) => ({
              value: data.id.toString(),
              text: data.name
            }))}
            placeholder="Find a person to start the conversation..."
            onSearch={this.onSearch}
            defaultActiveFirstOption={false}
            onSelect={this.onSelect}
          />
          <Icon onClick={this.props.addNewRoom} type="right-circle-o" />
        </div>
      </div>
    );
  }
}

export default MessageContent;
