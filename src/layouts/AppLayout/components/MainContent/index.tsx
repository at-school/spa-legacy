import { Input, Layout } from "antd";
import React from "react";
import Header from "../Header";

interface IMainContentProps {
  collapsed: boolean;
  searchInputHeaderRef: React.RefObject<Input>;
  toggleSearch: () => void;
  searchVisible: boolean;
  content: React.SFC;
  pathname: string;
}

const MainContent: React.SFC<IMainContentProps> = ({
  collapsed,
  searchInputHeaderRef,
  toggleSearch,
  searchVisible,
  content,
  pathname
}) => {
  const Content = content;

  return (
    <Layout
      className={
        collapsed ? "main-layout-layout-collapsed" : "main-layout-layout"
      }
    >
      <Header
        searchInputHeaderRef={searchInputHeaderRef}
        toggleSearch={toggleSearch}
        searchVisible={searchVisible}
        pathname={pathname}
      />
      <Layout.Content className="layout-content">
        <Content />
      </Layout.Content>
      {/* <Layout.Footer style={{ textAlign: "center" }}>
        At School ©2018
      </Layout.Footer> */}
    </Layout>
  );
};

export default MainContent;
