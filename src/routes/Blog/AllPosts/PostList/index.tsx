import React from "react";
import PostItem from "./PostItem";

const PostList: React.SFC<any> = ({ posts, searchPattern }) => (
  <div className="main-container">
    <div className="post-container">
      {posts.map((post: any, index: number) => {
        if (post.title.includes(searchPattern.toLowerCase())) {
          return <PostItem {...post} key={index} />;
        }
        return false;
      })}
    </div>
  </div>
);

export default PostList;
