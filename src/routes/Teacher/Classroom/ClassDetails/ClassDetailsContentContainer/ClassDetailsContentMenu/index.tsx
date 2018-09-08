import { css, StyleSheet } from "aphrodite";
import React from "react";
import { Link, withRouter } from "react-router-dom";

class ClassDetailsContentMenu extends React.Component<any, any> {
  public render() {
    return (
      <nav>
        <ul className={css(styles.mainListStyle)}>
          {["Students", "Reports", "Assignment", "Statistics"].map(
            (value: string, index: number) => (
              <Link
                to={{
                  pathname:
                    "/teacher/classroom/" +
                    this.props.match.params.id +
                    "/" +
                    value.toLowerCase(),
                  state: this.props.location.state
                }}
                key={String(index)}
                className={css(styles.noTextDecoration)}
              >
                <li
                  className={css(
                    styles.itemStyle,
                    this.props.activeItem === index && styles.activeKey
                  )}
                  onClick={this.changeItem}
                >
                  {value}
                </li>
              </Link>
            )
          )}
        </ul>
      </nav>
    );
  }

  private changeItem = () => {
    console.log(this.props);
    // this.props.history.push()
  };
}

const styles = StyleSheet.create({
  mainListStyle: {
    listStyle: "none",
    // color: "rgb(87, 103, 127)",

    fontSize: "1rem",
    paddingLeft: "0",
    marginRight: "32px",
    paddingRight: "12px",
    borderRight: "2px solid #f1f1f1"
  },
  itemStyle: {
    marginBottom: "5px",
    cursor: "pointer",
    color: "#999"
  },
  activeKey: {
    color: "#1890ff",
  },
  noTextDecoration: {
    textDecoration: "none"
  }
});

export default withRouter(ClassDetailsContentMenu);
