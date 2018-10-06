import { css, StyleSheet } from "aphrodite";
import React from "react";
import { IDetailsUserInfoProps } from "../interfaces";
import DetailsUserInfoBio from "./DetailsUserInfoBio";

const DetailsUserInfo: React.SFC<IDetailsUserInfoProps> = ({self, token, userId, bio}) => {
  return (
    <div>
      <div className={css(styles.name)}>James Jake</div>
      <DetailsUserInfoBio bio={bio} userId={userId} token={token} self={self}/>
    </div>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  
});

export default DetailsUserInfo;
