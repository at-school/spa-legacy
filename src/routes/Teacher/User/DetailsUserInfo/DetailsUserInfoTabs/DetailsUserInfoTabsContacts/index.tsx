import { css, StyleSheet } from "aphrodite";
import React from "react";

interface IDetailsUserInfoTabsContactsProps {
  email: string;
  phone: string;
  dob: string;
  gender: string;
}

const DetailsUserInfoTabsContacts: React.SFC<
  IDetailsUserInfoTabsContactsProps
> = ({ email, phone, dob, gender }) => {
  return (
    <div>
      <div>
        <div className={css(styles.heading)}>Contact Information</div>
        <div>
          <table>
            <tbody>
              <tr className={css(styles.tableRow)}>
                <td className={css(styles.tableTitle)}>Phone:</td>
                <td>{phone}</td>
              </tr>
              <tr className={css(styles.tableRow)}>
                <td className={css(styles.tableTitle)}>Email:</td>
                <td>
                  <a>{email}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className={css(styles.heading)}>Basic Information</div>
        <table>
          <tbody>
            <tr className={css(styles.tableRow)}>
              <td className={css(styles.tableTitle)}>Birthday:</td>
              <td>{dob}</td>
            </tr>
            <tr className={css(styles.tableRow)}>
              <td className={css(styles.tableTitle)}>Gender:</td>
              <td>{gender.charAt(0).toUpperCase() + gender.slice(1)}</td>
            </tr>
          </tbody>
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
