import React, { Component, Fragment } from "react";
import "../styles/styles.css";

interface IAuthor {
  name: string;
  twitter: string;
}

const createPost = (
  Content: any,
  title: string,
  date: string,
  overview: string,
  authors: IAuthor[]
) => {
  return class Post extends Component {
    public render() {
      const jsxAuthors = authors.map((author: IAuthor) => {
        return (
          <a href={author.twitter} key={author.twitter}>
            {author.name}{" "}
          </a>
        );
      });
      return (
        <Fragment>
          <div className="blog-outer-container">
            <div className="blog-post-content-container">
              <h1 className="blog-post-title">{title}</h1>
              <p className="blog-post-author-date">
                {date} by {jsxAuthors[0]} {jsxAuthors[1] && " and "}
                {jsxAuthors[1]}
              </p>
              <div className="blog-post-overview">{overview}</div>
              <Content />
            </div>
          </div>
        </Fragment>
      );
    }
  };
};

export default createPost;
