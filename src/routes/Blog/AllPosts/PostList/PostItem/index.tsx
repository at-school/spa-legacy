import React from "react";
import { Link } from "react-router-dom";

const PostItem: React.SFC<any> = ({ postId, title, date, author }) => (
  <div className="post">
    <div className="post-content">
      <Link to={"/blog/post/" + postId}>{title}</Link>
      <h4>{date}</h4>
      <h5>{author}</h5>
    </div>
  </div>
);

export default PostItem;
