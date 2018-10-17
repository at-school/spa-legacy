import { css, StyleSheet } from "aphrodite";
import React from "react";

const createSection = (sectionTitle: string, Content: any) => {
  return class Post extends React.Component {
    public render() {
      return (
        <div className="blog-section">
          <h2 className="blog-section-title">{sectionTitle}</h2>
          <p className={"blog-section-content " + css(styles.contentStyle)}>
            <Content />
          </p>
        </div>
      );
    }
  };
};

const styles = StyleSheet.create({
  contentStyle: {
    fontSize: 16,
    marginTop: 25,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
  }
});

export default createSection;
