import { Layout } from "antd";
import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { INavigationProps } from "./Navigation";
import "./styles/styles.css";

interface IHeaderGuestProps extends INavigationProps {
  background?: boolean;
}

const HeaderGuest: React.SFC<IHeaderGuestProps> = ({ menu, background }) => (
  <Layout.Header
    className={"navigation" + (background ? " navigation-background" : "")}
  >
    <Logo />
    <Navigation menu={menu} />
  </Layout.Header>
);

export default HeaderGuest;
