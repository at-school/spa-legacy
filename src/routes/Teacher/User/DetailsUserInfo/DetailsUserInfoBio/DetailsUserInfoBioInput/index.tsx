import { Button, Input } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

interface IDetailsUserInfoInput {
  toggleBioEdit: () => void;
  bioValue: string;
  onChangeBio: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onConfirm: () => void;
}

const DetailsUserInfoInput: React.SFC<IDetailsUserInfoInput> = ({
  toggleBioEdit,
  bioValue,
  onChangeBio,
  onConfirm
}) => {
  return (
    <div>
      <Input.TextArea value={bioValue} placeholder="Add a bio" onChange={onChangeBio} rows={4} />
      <div className={css(styles.buttonContainer)}>
        <Button onClick={onConfirm} className={css(styles.saveButton)} type="primary">
          Save
        </Button>
        <Button onClick={toggleBioEdit}>Cancel</Button>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 8
  },
  saveButton: {
    marginRight: 4
  }
});

export default DetailsUserInfoInput;
