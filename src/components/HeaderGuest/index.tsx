import { Layout } from "antd";
import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { IHeaderGuestProps } from "./Navigation";
import "./styles/styles.css";

const HeaderGuest: React.SFC<IHeaderGuestProps> = ({menu}) => (
  <Layout.Header className="navigation">
    <Logo />
    <Navigation menu={menu}/>
  </Layout.Header>
);

export default HeaderGuest;
