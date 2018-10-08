import { AutoComplete, Icon } from "antd";
import React from "react";
import { compose, graphql } from "react-apollo";
import { searchUsers } from "../../../../../api/message";
import AppContext from "../../../../../contexts/AppContext";
import { addChatRoomMutation, getChatRoomQuery } from "../../queries/queries";

interface IUserListFromServer {
  data: Array<{
    _id: string;
    firstname: string;
    lastname: string;
    avatar: string;
  }>;
}

interface IAddChatRoomState {
  dataSource: Array<{
    id: string;
    name: string;
  }>;
  selectedId?: string;
}

class AddChatRoom extends React.Component<
  {
    token: string;
    toggleAddChatRoom: () => void;
    addChatRoomMutation: any;
    userId: string;
  },
  IAddChatRoomState
> {
  public state = {
    dataSource: [],
    selectedId: "",
    selectedName: ""
  };

  public render() {
    return (
      <div className="add-chatroom">
        <div className="add-chatroom-content-container">
          <div>To:</div>
          <AutoComplete
            dataSource={this.state.dataSource.map((data: any) => ({
              value: data.id,
              text: data.name
            }))}
            placeholder="Find a person to start the conversation..."
            onSearch={this.onSearch}
            defaultActiveFirstOption={false}
            onSelect={this.onSelect}
          />
          <Icon onClick={this.handleAdd} type="right-circle-o" />
        </div>
      </div>
    );
  }

  private handleAdd = () => {
    if (this.state.selectedId) {
      const name = (this.state.dataSource.find(
        (item: any) => item.id === this.state.selectedId
      ) as any).name;

      this.props.addChatRoomMutation({
        variables: {
          firstId: this.state.selectedId,
          secondId: this.props.userId,
          name
        },
        update: (store: any, { data: { createChatroom } }: any) => {
          const data = store.readQuery({
            query: getChatRoomQuery,
            variables: { Id: this.props.userId }
          });

          if (
            data &&
            data.user &&
            data.user.length === 1 &&
            data.user[0].chatrooms
          ) {
            data.user[0].chatrooms.unshift(createChatroom);
          }
          store.writeQuery({
            query: getChatRoomQuery,
            variables: { Id: this.props.userId },
            data
          });
          this.props.toggleAddChatRoom();
        }
      });
    }
  };

  private onSelect = (value: any) => {
    this.setState({ selectedId: value });
  };

  private onSearch = (searchPattern: string) => {
    if (searchPattern.length === 0) {
      this.setState({ dataSource: [] });
    } else {
      searchUsers(searchPattern, this.props.token).then(
        (res: IUserListFromServer) => {
          this.setState({
            dataSource: res.data.map(user =>
              Object.create({
                id: user._id,
                name: user.firstname + " " + user.lastname
              })
            )
          });
        }
      );
    }
  };
}

const AddChatRoomWithContext = (props: any) => (
  <AppContext.Consumer>
    {value => <AddChatRoom {...props} userId={value.userId} />}
  </AppContext.Consumer>
);

export default compose(
  graphql(addChatRoomMutation, { name: "addChatRoomMutation" })
)(AddChatRoomWithContext);
