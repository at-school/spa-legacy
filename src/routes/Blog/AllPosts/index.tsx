import React from "react";
import AllPostsHeader from "./AllPostsHeader";
import PostList from "./PostList";

const AllPosts: React.SFC<any> = ({
  handleSearch,
  handleToggleFocus,
  focus,
  posts,
  searchPattern
}) => (
  <React.Fragment>
	<AllPostsHeader
	  handleSearch={handleSearch}
	  handleToggleFocus={handleToggleFocus}
	  focus={focus}
	/>
	<PostList posts={posts} searchPattern={searchPattern} />
  </React.Fragment>
);

export default AllPosts;
