import { Button, Upload } from "antd";
import { css, StyleSheet } from "aphrodite/no-important";
import React from "react";

const GeneralSettingsAvatar: React.SFC<{ avatar: string }> = ({ avatar }) => (
  <React.Fragment>
    <div>
      <img className={css(styles.avatar)} src={avatar} alt="avatar" />
    </div>
    <Upload className={css(styles.uploadContainer)} fileList={[]}>
      <div>
        <Button icon="upload">Change Avatar</Button>
      </div>
    </Upload>
  </React.Fragment>
);

const styles = StyleSheet.create({
  avatar: {
    marginBottom: 12,
    marginTop: 24
  },
  uploadContainer: {
    display: "flex",
    justifyContent: "center"
  }
});

export default GeneralSettingsAvatar;
