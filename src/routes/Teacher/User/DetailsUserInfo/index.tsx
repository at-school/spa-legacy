import { css, StyleSheet } from "aphrodite";
import React from "react";
import { IDetailsUserInfoProps } from "../interfaces";
import DetailsUserInfoBio from "./DetailsUserInfoBio";
import DetailsUserInfoTabs from "./DetailsUserInfoTabs";
import DetailsUserInfoTabsContacts from "./DetailsUserInfoTabs/DetailsUserInfoTabsContacts";
import DetailsUserInfoTools from "./DetailsUserInfoTools";

const DetailsUserInfo: React.SFC<IDetailsUserInfoProps> = ({
  self,
  name,
  token,
  userId,
  bio,
  currentUserAccessLevel,
  userSearchAccessLevel,
  email,
  dob,
  phone,
  gender
}) => {
  return (
    <div>
      <div className={css(styles.name)}>{name}</div>
      <DetailsUserInfoBio bio={bio} userId={userId} token={token} self={self} />
      <DetailsUserInfoTools />
      {currentUserAccessLevel > 1 && userSearchAccessLevel <= 1 ? (
        <DetailsUserInfoTabs gender={gender} email={email} dob={dob} phone={phone} />
      ) : (
        <DetailsUserInfoTabsContacts email={email} dob={dob} phone={phone} gender={gender} />
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px"
  }
});

export default DetailsUserInfo;
