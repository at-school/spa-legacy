import { Icon } from "antd";
import React from "react";

const PostHeader: React.SFC<any> = ({
  handleSearch,
  handleToggleFocus,
  focus
}) => (
  <div className="header">
	<span className="heading">Atschool Blog Posts</span>
	<div className={"search-outer-container" + (focus ? " fade" : "")}>
	  <Icon type="search" />
	  <div className="search-inner-container">
		<input
		  type="text"
		  name=""
		  onChange={handleSearch}
		  onFocus={handleToggleFocus}
		  onBlur={handleToggleFocus}
		  placeholder="Search posts"
		/>
	  </div>
	</div>
  </div>
);

export default PostHeader;
