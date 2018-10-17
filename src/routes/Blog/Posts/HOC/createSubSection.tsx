import { css, StyleSheet } from "aphrodite";
import React from "react";

const createSection = (subSectionTitle: string, Content: any) => {
  return class Post extends React.Component {
    public render() {
      return (
        <div className="blog-subsection">
          <h2 className="blog-subsection-title">{subSectionTitle}</h2>
          <div
            className={"blog-subsection-content " + css(styles.contentStyling)}
          >
            <Content />
          </div>
        </div>
      );
    }
  };
};

const styles = StyleSheet.create({
  contentStyling: {
    fontSize: 16,
    marginTop: 25,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
  }
});

export default createSection;
