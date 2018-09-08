import {
  Avatar,
  Badge,
  Icon,
  Input,
  Layout,
  List,
  Menu,
  Popover,
  Tabs
} from "antd";
import React from "react";
import AppContext from "../../../../contexts/AppContext";

interface IHeaderProps {
  /** toggle the search bar */
  toggleSearch: () => void;
  /** if it's visible, then show the search bar */
  searchVisible: boolean;
  /** reference to the search input bar */
  searchInputHeaderRef: React.RefObject<Input>;
  pathname: string;
  signoutUser: () => void;
  fullname: string;
  avatarUrl: string;
}

const Header: React.SFC<IHeaderProps> = ({
  toggleSearch,
  searchVisible,
  searchInputHeaderRef,
  pathname,
  signoutUser,
  fullname,
  avatarUrl
}) => {
  let headerDisplayText = "";
  if (pathname.includes("/teacher/dashboard")) {
    headerDisplayText = "Dashboard";
  } else if (pathname.includes("/teacher/classroom")) {
    headerDisplayText = "Classroom";
  } else if (pathname.includes("/teacher/rollcall")) {
    headerDisplayText = "Roll Call";
  } else if (pathname.includes("/teacher/messages")) {
    headerDisplayText = "Messages";
  }
  return (
    <Layout.Header className="main-layout-layout-header">
      <div className="main-layout-layout-header-left">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">{headerDisplayText}</Menu.Item>
        </Menu>
      </div>
      <div className="main-layout-layout-header-right">
        <Menu mode="horizontal" selectedKeys={["-1"]}>
          <Menu.Item className="no-style">
            <div className="search">
              <Icon type="search" onClick={toggleSearch} />
              <Input
                ref={searchInputHeaderRef}
                className={searchVisible ? "input-show" : ""}
                placeholder="Search..."
                onBlur={toggleSearch}
              />
            </div>
          </Menu.Item>

          <Menu.Item className="menu-item-bell-badge">
            <Popover
              overlayClassName="notification-box"
              content={
                <Tabs animated={false} defaultActiveKey="1">
                  <Tabs.TabPane
                    className="notice-section"
                    tab="Notices"
                    key="1"
                  >
                    <NoticesList />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    className="message-section"
                    tab="Messages"
                    key="2"
                  >
                    <MessagesList />
                  </Tabs.TabPane>
                </Tabs>
              }
              trigger="click"
              arrowPointAtCenter={true}
              placement="bottomRight"
            >
              <div className="bell-badge-container">
                <Badge dot={true}>
                  <Icon type="bell" />
                </Badge>
              </div>
            </Popover>
          </Menu.Item>

          <Menu.SubMenu
            className="user-avatar"
            title={
              <React.Fragment>
                <Avatar src={avatarUrl} size="small" />
                <p>{fullname}</p>
              </React.Fragment>
            }
          >
            <Menu.Item key="setting:1">
              <Icon type="user" />
              Profile
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Icon type="setting" />
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="setting:3" onClick={signoutUser}>
              <Icon type="logout" />
              Sign Out
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  );
};

const NoticesList = () => {
  const data = [
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={NoticeListItem}
    />
  );
};

const NoticeListItem = (item: any) => (
  <List.Item>
    <List.Item.Meta
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      title="Ant Design, a design language for background applications, is refined by Ant UED Team"
      // description={item.title}
      description={<div className="timestamp">1 year ago</div>}
    />
  </List.Item>
);

const MessagesList = () => {
  const data = [
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={MessageListItem}
    />
  );
};

const MessageListItem = (item: any) => (
  <List.Item>
    <List.Item.Meta
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      title="Chat name"
      // description={item.title}
      description={
        <div>
          <div className="chat-content">
            This is at school and i am at school
          </div>
          <div className="timestamp">1 year ago</div>
        </div>
      }
    />
  </List.Item>
);

export default (props: any) => (
  <AppContext.Consumer>
    {value => (
      <Header
        {...props}
        fullname={value.fullname}
        avatarUrl={value.avatarUrl}
        signoutUser={value.signoutUser}
      />
    )}
  </AppContext.Consumer>
);
