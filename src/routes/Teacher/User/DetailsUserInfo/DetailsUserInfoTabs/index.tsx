import { Tabs } from "antd";
import React from "react";
import DetailsUserInfoTabsAcademic from "./DetailsUserInfoTabsAcademic";
import DetailsUserInfoTabsContacts from "./DetailsUserInfoTabsContacts";

interface IDetailsUserInfoTabsProps {
  phone: string;
  dob: string;
  email: string;
  gender: string;
}

const DetailsUserInfoTabs: React.SFC<IDetailsUserInfoTabsProps> = ({
  phone,
  dob,
  email,
  gender
}) => {
  return (
    <Tabs defaultActiveKey="2">
      <Tabs.TabPane tab={<span>Academic Stats</span>} key="1">
        <DetailsUserInfoTabsAcademic />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<span>About</span>} key="2">
        <DetailsUserInfoTabsContacts
          gender={gender}
          phone={phone}
          dob={dob}
          email={email}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default DetailsUserInfoTabs;
