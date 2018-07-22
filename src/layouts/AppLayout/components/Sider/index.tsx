import { Layout } from "antd";
import React from "react";

interface ISiderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  navigation: React.SFC<{ pathname: string }>;
  pathname: string;
}

/**
 * Sider for the main layout.
 * It is the vertical sider which contains a menu (navigation).
 */
const Sider: React.SFC<ISiderProps> = ({
  collapsed,
  onCollapse,
  navigation,
  pathname
}) => {
  const Navigation = navigation;
  return (
    <Layout.Sider
      breakpoint="lg"
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsible={true}
      className="main-layout-sider"
    >
      <div className="logo" style={{ height: "64px", paddingLeft: "24px" }}>
        <a href="#/">
          <img style={{ height: "34px" }} src="/logo1.png" alt="Logo" />
          <h1>@ School</h1>
        </a>
      </div>
      <Navigation pathname={pathname} />
    </Layout.Sider>
  );
};

export default Sider;
