import { Menu } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { Link, Route } from "react-router-dom";
import GeneralSettings from "./GeneralSettings";
import PrivacySettings from "./PrivacySettings";

const SettingsPage = () => {
  return (
    <div className={css(styles.mainContainer)}>
      <div>
        <Menu
          style={{ width: 256 }}
          mode="inline"
          theme="light"
          defaultSelectedKeys={["0"]}
          className={css(styles.menuContainer)}
        >
          <Menu.Item key="0">
            <Link to="/teacher/settings/general">General</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/teacher/settings/privacy">Privacy</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className={css(styles.contentContainer)}>
        <Route
          exact={true}
          component={GeneralSettings}
          path="/teacher/settings/general"
        />
        <Route
          exact={true}
          component={PrivacySettings}
          path="/teacher/settings/privacy"
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: "calc(100% - 48px)",
    padding: "8px 0px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white"
  },
  menuContainer: {
    height: "100%",
    marginRight: 16
  },
  contentContainer: {
    flex: 1
  }
});

export default SettingsPage;
