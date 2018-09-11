import { AutoComplete, Avatar, Button } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
const Option = AutoComplete.Option;

const StudentSearchInput = ({
  onSelect,
  dataSource,
  canAddUser,
  onChange,
  handleAddNewStudent,
  updateSearchValue,
  value
}: any) => {
  const options = dataSource.map((opt: any) => (
    <Option title={`${opt.name} - ${opt.Id}`} key={opt.Id} value={opt.Id}>
      <Avatar className={css(styles.avatar)} src={opt.avatar} />
      {opt.name}
    </Option>
  ));
  return (
    <div className={css(styles.topMain)}>
      <AutoComplete
        className={css(styles.input)}
        dataSource={options}
        onChange={onChange}
        style={{ width: 200 }}
        placeholder="Search for students"
        allowClear={true}
        defaultActiveFirstOption={false}
        optionLabelProp="title"
        onSearch={updateSearchValue}
        value={value}
        onSelect={onSelect}
      />
      <Button
        className={css(styles.button)}
        disabled={!canAddUser}
        type="primary"
        onClick={handleAddNewStudent}
      >
        Select student
      </Button>
    </div>
  );
};

const styles = StyleSheet.create({
  topMain: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: "24px"
  },
  input: {
    marginRight: "12px",
    flex: "0.85"
  },
  button: {
    flex: "0.15"
  },
  avatar: {
    marginRight: "8px"
  }
});
export default StudentSearchInput;
