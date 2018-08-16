import React, { Component, Fragment } from "react";
import "./styles/styles.css";

const createPost = (
  Content: any,
  title: string,
  date: string,
  authors: string[]
) => {
  return class Post extends Component {
    public render() {
      return (
        <Fragment>
          <div className="blog-outer-container">
            <div className="blog-post-content-container">
              <h1 className="blog-post-title">{title}</h1>
              <p>{date}</p>
              <p>{authors}</p>
              <Content />
            </div>
          </div>
        </Fragment>
      );
    }
  };
};

export default createPost;
