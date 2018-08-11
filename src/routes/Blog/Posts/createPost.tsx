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
          <div
            style={{
              backgroundImage: `url('https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg')`,
              height: "400px"
            }}
          />
          <div className="blog-outer-container">
            <div className="blog-post-container">
              <h1>{title}</h1>
              <h3>{abstract}</h3>
              <h4>{authors}</h4>
              <small>{date}</small>
            </div>
          </div>
          <Content />
        </Fragment>
      );
    }
  };
};

export default createPost;
