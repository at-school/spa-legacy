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

interface IHeaderProps {
  /** toggle the search bar */
  toggleSearch: () => void;
  /** if it's visible, then show the search bar */
  searchVisible: boolean;
  /** reference to the search input bar */
  searchInputHeaderRef: React.RefObject<Input>;
  pathname: string;
}

const Header: React.SFC<IHeaderProps> = ({
  toggleSearch,
  searchVisible,
  searchInputHeaderRef,
  pathname
}) => {
  let headerDisplayText = "";
  switch (pathname) {
    case "/teacher/dashboard":
      headerDisplayText = "Dashboard";
      break;
    case "/teacher/rollcall":
      headerDisplayText = "Roll Call";
      break;
    case "/teacher/classroom":
      headerDisplayText = "Classroom";
      break;
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
              <div onClick={toggleSearch}>
                <Icon type="search" />
              </div>
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
            title={
              <div className="user-avatar">
                <Avatar icon="user" size="small" />
                <p>User</p>
              </div>
            }
          >
            <Menu.Item key="setting:1">
              <Icon type="user" />Profile
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Icon type="setting" />Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="setting:3">
              <Icon type="logout" />Sign Out
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

export default Header;
