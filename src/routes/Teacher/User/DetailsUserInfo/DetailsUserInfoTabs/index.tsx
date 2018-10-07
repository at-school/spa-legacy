import { Tabs } from "antd";
import React from "react";
import DetailsUserInfoTabsAcademic from "./DetailsUserInfoTabsAcademic";
import DetailsUserInfoTabsContacts from "./DetailsUserInfoTabsContacts";

const DetailsUserInfoTabs = () => {
  return (
    <Tabs defaultActiveKey="2">
      <Tabs.TabPane tab={<span>Academic Stats</span>} key="1">
        <DetailsUserInfoTabsAcademic />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span>About</span>} key="2">
        <DetailsUserInfoTabsContacts />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default DetailsUserInfoTabs;
