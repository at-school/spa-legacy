import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface IMenu {
  name: string;
  url: string;
}

interface IHeaderGuestProps {
  menu: IMenu[];
}

const Navigation: React.SFC<IHeaderGuestProps> = ({ menu }) => (
  <Menu
    theme="light"
    mode="horizontal"
    selectedKeys={["-1"]}
    style={{ lineHeight: "64px" }}
  >
    {menu.map((item, key) => (
      <Menu.Item key={key.toString()}>
        <Link to={item.url}>{item.name}</Link>
      </Menu.Item>
    ))}
  </Menu>
);

export default Navigation;
