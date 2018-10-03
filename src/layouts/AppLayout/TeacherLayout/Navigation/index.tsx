import { Icon, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.SFC<{ pathname: string }> = ({ pathname }) => {
  let menuKey = "";

  if (pathname.includes("/teacher/dashboard")) {
    menuKey = "1";
  } else if (pathname.includes("/teacher/classroom")) {
    menuKey = "2";
  } else if (pathname.includes("/teacher/rollcall")) {
    menuKey = "3";
  } else if (pathname.includes("/teacher/messages")) {
    menuKey = "4";
  } else if (pathname.includes("/teacher/user")) {
    menuKey = "5";
  }
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[menuKey]}>
      <Menu.Item key="1">
        <Link to="/teacher/dashboard">
          <Icon type="dashboard" />
          <span className="nav-text">Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/teacher/classroom">
          <Icon type="profile" />
          <span className="nav-text">Classroom</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/teacher/rollcall">
          <Icon type="video-camera" />
          <span className="nav-text">Roll Call</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/teacher/messages">
          <Icon type="message" />
          <span className="nav-text">Messages</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/teacher/user">
          <Icon type="user" />
          <span className="nav-text">User</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
