import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <Menu
    theme="light"
    mode="horizontal"
    selectedKeys={["-1"]}
    style={{ lineHeight: "64px" }}
  >
    <Menu.Item key="1">
      <Link to="authentication/signin">Sign in</Link>
    </Menu.Item>
  </Menu>
);

export default Navigation;
