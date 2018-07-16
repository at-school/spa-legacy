import { Icon, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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

export default Navigation;
