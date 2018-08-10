import { Layout } from "antd";
import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import "./styles/styles.css"

interface IMenu {
  name: string;
  url: string;
}

interface IHeaderGuestProps {
  menu: IMenu[];
}

const HeaderGuest: React.SFC<IHeaderGuestProps> = ({menu}) => (
  <Layout.Header className="navigation">
    <Logo />
    <Navigation menu={menu}/>
  </Layout.Header>
);

export default HeaderGuest;
