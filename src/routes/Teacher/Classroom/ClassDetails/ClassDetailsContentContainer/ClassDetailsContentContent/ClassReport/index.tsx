import { Button } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const Reports = (props: any) => {
  return (
    <div style={{width: "100%"}}>
      <ClassReport />
      <AttendancesReport />
    </div>
  );
};

const ClassReport = (props: any) => {
  return (
    <div className={css(styles.reportContainer)}>
      <h2>Class Reports</h2>
      <p>
        Class Report has all the information related to how the students are
        doing in a class, their marks, their attendaces.
      </p>
      <Button type="primary" size="large">
        Download now
      </Button>
    </div>
  );
};

const AttendancesReport = (props: any) => {
  return (
    <div className={css(styles.reportContainer)}>
      <h2>Attendances Reports</h2>
      <p>
        Class Report has all the information related to how the students are
        doing in a class, their marks, their attendaces.
      </p>
      <Button type="primary" size="large">
        Download now
      </Button>
    </div>
  );
};

const styles = StyleSheet.create({
  reportContainer: {
    width: "100%",
    padding: "20px",
    border: "2px solid #f1f1f1",
    marginBottom: "20px"
  }
});

export default Reports;
