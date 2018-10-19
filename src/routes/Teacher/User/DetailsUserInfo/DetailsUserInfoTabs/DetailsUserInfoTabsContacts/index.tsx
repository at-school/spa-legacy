import { css, StyleSheet } from "aphrodite";
import React from "react";
import { withRouter } from "react-router-dom";

interface IDetailsUserInfoTabsContactsProps {
  email: string;
  phone: string;
  dob: string;
  gender: string;
  history;
}

const DetailsUserInfoTabsContacts: React.SFC<
  IDetailsUserInfoTabsContactsProps
> = ({ email, phone, dob, gender, history }) => {
  const goToEmail = () =>
    history.push({ pathname: "/teacher/email/new", state: { email } });
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
                  <a onClick={goToEmail}>{email}</a>
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
              <td className={css(styles.capitalize)}>{gender}</td>
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
  },
  capitalize: {
    textTransform: "capitalize"
  }
});

export default withRouter(DetailsUserInfoTabsContacts as any) as any;
