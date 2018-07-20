import { Layout } from "antd";
import React from 'react';
import Logo from './Logo';
import Navigation from "./Navigation";

const Header = () => (
    <Layout.Header className="navigation">
      <Logo />
      <Navigation />
    </Layout.Header>
  );

export default Header