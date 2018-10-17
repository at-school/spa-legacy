import { css, StyleSheet } from "aphrodite";
import moment from "moment";
import React from "react";
import { withRouter } from "react-router-dom";

const data = [
  [
    { code: "sdfsd", location: "H5:19", line: "1" },
    { code: "sdfsd", location: "H5:19", line: "2" },
    { code: "sdfsd", location: "H5:19", line: "3" },
    { code: "sdfsd", location: "H5:19", line: "4" },
    { code: "sdfsd", location: "H5:19", line: "4" },
    false,
    false,
    false
  ],
  [
    { code: "sdfsd", location: "H5:19", line: "1" },
    { code: "sdfsd", location: "H5:19", line: "2" },
    { code: "sdfsd", location: "H5:19", line: "3" },
    { code: "sdfsd", location: "H5:19", line: "4" },
    false,
    false,
    false,
    false
  ],
  [
    { code: "sdfsd", location: "H5:19", line: "1" },
    { code: "sdfsd", location: "H5:19", line: "2" },
    { code: "sdfsd", location: "H5:19", line: "3" },
    { code: "sdfsd", location: "H5:19", line: "4" },
    false,
    false,
    false,
    false
  ],
  [
    { code: "sdfsd", location: "H5:19", line: "1" },
    { code: "sdfsd", location: "H5:19", line: "2" },
    { code: "sdfsd", location: "H5:19", line: "3" },
    { code: "sdfsd", location: "H5:19", line: "4" },
    false,
    false,
    false,
    false
  ],
  [
    { code: "sdfsd", location: "H5:19", line: "1" },
    { code: "sdfsd", location: "H5:19", line: "2" },
    { code: "sdfsd", location: "H5:19", line: "3" },
    { code: "sdfsd", location: "H5:19", line: "4" },
    false,
    false,
    false,
    false
  ]
];

/*
  data in the form: 
  - first, second, ... fifth element: Mon, Tue, Wed, Thu, Fri
  - each item contains: class code, location of class, and line of the class
*/

class CalendarBody extends React.Component<{ schedule: any; history: any }> {
  public goToClass = (classId: string) => () => {
    if (classId) {
      let classDetails = {};
      for (const scheduleItem of this.props.schedule) {
        const found = false;
        for (const record of scheduleItem) {
          if (record.Id === classId) {
            classDetails = { ...record };
            break;
          }
        }
        if (found) {
          break;
        }
      }
      this.props.history.push(
        "/teacher/classroom/" + classId + "/students",
        classDetails
      );
    }
  };

  public render() {
    let dataTranpose = data[0].map((col, i) => data.map(row => row[i]));
    if (this.props.schedule.length) {
      dataTranpose = this.props.schedule[0].map((col: any, i: any) =>
        this.props.schedule.map((row: any) => row[i])
      );
    }

    let currentDay = moment().day() - 1;
    if (currentDay > 4) {
      currentDay = 0;
    }
    return (
      <React.Fragment>
        <tbody>
          {dataTranpose.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((record: any, idx) => {
                  return record ? (
                    <td onClick={this.goToClass(record.Id)} key={idx}>
                      <div
                        className={css(
                          styles.rowDataContainer,
                          index === 0 &&
                            currentDay === idx &&
                            styles.hightlightBorderTop
                        )}
                      >
                        <div className={css(styles.rowDataLine)}>
                          Line {record.line}
                        </div>
                        <div className={css(styles.rowDataLineSub)}>
                          <div>
                            {record.startTime} - {record.endTime}
                          </div>
                          <div>{record.Id ? record.Id.slice(0, 4) : ""}</div>
                        </div>
                        <div className={css(styles.rowDataContent)} />
                      </div>
                    </td>
                  ) : (
                    <td>
                      <div />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  rowDataContainer: {
    textAlign: "left",
    margin: "0 4px",
    display: "block",
    color: "rgba(0, 0, 0, 0.65)",
    height: 116,
    padding: "4px 8px",
    borderTop: "2px solid #e8e8e8",
    transition: "background .3s",
    ":hover": {
      background: "#e6f7ff",
      cursor: "pointer"
    }
  },
  rowDataLine: {
    textAlign: "right",
    background: "transparent",
    width: "auto",
    marginBottom: 4
  },
  rowDataLineSub: {
    fontSize: 12,
    textAlign: "right"
  },
  rowDataContent: {
    height: 88,
    overflowY: "auto",
    position: "static",
    width: "auto",
    left: "auto",
    bottom: "auto"
  },
  hightlightBorderTop: {
    borderTopColor: "#1890ff"
  }
});

export default withRouter(CalendarBody as any) as any;
