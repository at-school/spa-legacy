import React, { Component, Fragment } from "react";
import { Route, withRouter } from "react-router-dom";
import HeaderGuest from "../../components/HeaderGuest";
import AllPosts from "./AllPosts";
import { posts } from "./Posts";
import "./styles/styles.css";

interface IState {
  searchPattern: string;
  focus: boolean;
}

class Blog extends Component<any, IState> {
  // public const stuff = { 'author': 'Charl Kruger', 'date': '24 February 2001' }

  public state = {
	searchPattern: "",
	focus: false
  };

  public handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	this.setState({ searchPattern: e.target.value });
  };

  public handleToggleFocus = () => {
	this.setState(prevState => ({
	  focus: !prevState.focus
	}));
  };

  public render() {
	return (
	  <Fragment>
		<HeaderGuest
		  menu={[
			{ name: "All Posts", url: "/blog" },
			{ name: "Sign In", url: "/authentication/signin" }
		  ]}
		  background={this.props.location.pathname !== "/blog"}
		/>

		{this.props.location.pathname === "/blog" && (
		  <AllPosts
			posts={posts}
			handleSearch={this.handleSearch}
			handleToggleFocus={this.handleToggleFocus}
			focus={this.state.focus}
			searchPattern={this.state.searchPattern}
		  />
		)}
		{posts.map((post, index) => (
		  <Route
			exact={true}
			key={index}
			path={"/blog/post/" + post.postId}
			component={post.component}
		  />
		))}
	  </Fragment>
	);
  }
}

export default withRouter(Blog);
