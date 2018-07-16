import { Input, Layout } from "antd";
import React from "react";
import MainContent from "./components/MainContent";
import Sider from "./components/Sider";
import "./styles/styles.css";

/**
 * Main layout for the app once user logs in.
 * This is HOC where input is the menu for the sider and the main content
 * for the app.
 */
const createMainLayout = (Navigation: React.SFC) => (Content: React.SFC) => {
  return class extends React.Component<
    {},
    { collapsed: boolean; searchVisible: boolean }
  > {
    public state = {
      collapsed: false,
      searchVisible: false
    };

    // set reference for the search bar
    // have to set the type to any so can reference it later for focusing
    public searchInputHeaderRef = React.createRef<Input>() as any;

    public onCollapse = (collapsed: boolean) => {
      this.setState({ collapsed });
    };

    public toggleSearch = () => {
      // focus the search bar when opening it
      if (!this.state.searchVisible) {
        this.searchInputHeaderRef.current.input.focus();
      }

      // open the search bar
      this.setState({ searchVisible: !this.state.searchVisible });
    };

    public render() {
      return (
        <div>
          <Layout id="main-layout">
            <Sider
              navigation={Navigation}
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            />
            <MainContent
              {...this.state}
              searchInputHeaderRef={this.searchInputHeaderRef}
              toggleSearch={this.toggleSearch}
              content={Content}
            />
          </Layout>
        </div>
      );
    }
  };
};

export default createMainLayout;
