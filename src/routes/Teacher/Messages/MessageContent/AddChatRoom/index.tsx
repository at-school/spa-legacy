import { AutoComplete, Icon } from "antd";
import React from "react";
import { searchUsers } from "../../../../../api/message";

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

export default AddChatRoom;
