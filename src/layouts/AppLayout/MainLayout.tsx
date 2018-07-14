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
import "./styles/styles.css";

class MainLayout extends React.Component {
  public state = {
    collapsed: false,
    searchVisible: false
  };

  public onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  public toggleSearch = () => {
    this.setState({ searchVisible: !this.state.searchVisible });
  };

  public render() {
    return (
      <div>
        <Layout id="main-layout">
          <Layout.Sider
            breakpoint="md"
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            collapsible={true}
            className="main-layout-sider"
          >
            <div
              className="logo"
              style={{ height: "64px", paddingLeft: "24px" }}
            >
              <a href="#/">
                <img style={{ height: "32px" }} src="/gngc.png" alt="Logo" />
                <h1>@ School</h1>
              </a>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">nav 3</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="bar-chart" />
                <span className="nav-text">nav 4</span>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="cloud-o" />
                <span className="nav-text">nav 5</span>
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="appstore-o" />
                <span className="nav-text">nav 6</span>
              </Menu.Item>
              <Menu.Item key="7">
                <Icon type="team" />
                <span className="nav-text">nav 7</span>
              </Menu.Item>
              <Menu.Item key="8">
                <Icon type="shop" />
                <span className="nav-text">nav 8</span>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout
            className={
              this.state.collapsed
                ? "main-layout-layout-collapsed"
                : "main-layout-layout"
            }
          >
            <Layout.Header className="main-layout-layout-header">
              <div className="main-layout-layout-header-left">
                <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                  <Menu.Item key="1">Dashboard</Menu.Item>
                </Menu>
              </div>
              <div className="main-layout-layout-header-right">
                <Menu mode="horizontal" selectedKeys={["-1"]}>
                  <Menu.Item className="no-style">
                    <div className="search">
                      <div>
                        <Icon onClick={this.toggleSearch} type="search" />
                      </div>
                        <Input
                          className={
                            this.state.searchVisible ? "input-show" : ""
                          }
                          placeholder="Search..."
                          onBlur={this.toggleSearch}
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
                        <p>sdfsd</p>
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
            <Layout.Content
              style={{ margin: "24px 16px 0", overflow: "initial" }}
            >
              <div
                style={{ padding: 24, background: "#fff", textAlign: "center" }}
              >
                ...
                <br />
                Really
                <br />...<br />...<br />...<br />
                long
                <br />...<br />...<br />...<br />...<br />...<br />...
                <br />...<br />...<br />...<br />...<br />...<br />...
                <br />...<br />...<br />...<br />...<br />...<br />...
                <br />...<br />...<br />...<br />...<br />...<br />...
                <br />...<br />...<br />...<br />...<br />...<br />...
                <br />...<br />...<br />...<br />...<br />...<br />...
                <br />...<br />...<br />...<br />...<br />...<br />
                content
              </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: "center" }}>
              Ant Design ©2016 Created by Ant UED
            </Layout.Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

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

export default MainLayout;
