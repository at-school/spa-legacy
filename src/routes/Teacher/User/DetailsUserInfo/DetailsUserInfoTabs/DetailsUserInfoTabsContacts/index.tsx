import { css, StyleSheet } from "aphrodite";
import React from "react";

const DetailsUserInfoTabsContacts = () => {
  return (
    <div>
      <div>
        <div className={css(styles.heading)}>Contact Information</div>
        <div>
          <table>
            <tr className={css(styles.tableRow)}>
              <td className={css(styles.tableTitle)}>Phone:</td>
              <td>08711293</td>
            </tr>
            <tr className={css(styles.tableRow)}>
              <td className={css(styles.tableTitle)}>Email:</td>
              <td>phamduyanh249@live.com</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <div className={css(styles.heading)}>Basic Information</div>
        <table>
          <tr className={css(styles.tableRow)}>
            <td className={css(styles.tableTitle)}>Birthday:</td>
            <td>24/09/2000</td>
          </tr>
          <tr className={css(styles.tableRow)}>
            <td className={css(styles.tableTitle)}>Gender:</td>
            <td>Male</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: 600,
    margin: "8px 0px 16px 0px"
  },
  tableTitle: {
    width: 80
  },
  tableRow: {
    height: 42
  }
});

export default DetailsUserInfoTabsContacts;
