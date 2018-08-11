import React, { Component, Fragment } from "react";
import "./styles/styles.css";

const createPost = (
  Content: any,
  title: string,
  abstract: string,
  date: string,
  authors: string[]
) => {
  return class Post extends Component {
    public render() {
      return (
        <Fragment>
          <div className="blog-outer-container">
            <div className="blog-post-header-container">
              <h1>{title}</h1>
              <p>
                {date} by {authors}
              </p>
              <h4>{abstract}</h4>
            </div>
            <div className="blog-post-content-container">
              <Content />
            </div>
          </div>
        </Fragment>
      );
    }
  };
};

export default createPost;
