import { css, StyleSheet } from "aphrodite";
import React from "react";

const CalendarHeader = () => {
  return (
    <thead>
      <tr>
        {["Mo", "Tu", "We", "Th", "Fr"].map(day => (
          <th className={css(styles.thStyle)} key={day}>
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const styles = StyleSheet.create({
  thStyle: {
    textAlign: "right",
    paddingRight: 12,
    paddingBottom: 5
  }
});

export default CalendarHeader;
