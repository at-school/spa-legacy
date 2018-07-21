import { Icon, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.SFC<{ pathname: string }> = ({ pathname }) => {
  let menuKey = "";
  switch (pathname) {
    case "/teacher/dashboard":
      menuKey = "1";
      break;
    case "/teacher/classroom":
      menuKey = "2";
      break;
    case "/teacher/rollcall":
      menuKey = "3";
      break;
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
    </Menu>
  );
};

export default Navigation;
