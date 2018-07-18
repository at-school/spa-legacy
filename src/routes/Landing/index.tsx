import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  public render() {
    return (
      <Layout className="layout">
        <Layout.Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">About</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            Layout.Content
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          Ant Design ©2016 Created by Ant UED
        </Layout.Footer>
      </Layout>
    );
  }
}

export const Temp = () => (
  <ul>
    <li>
      <Link to="authentication/signin">Sign in</Link>
    </li>
    <li>
      <Link to="authentication/register">Register</Link>
    </li>
    <li>
      <Link to="teacher/dashboard">Teacher</Link>
    </li>
  </ul>
);
