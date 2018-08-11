import { Icon } from 'antd';
import React, { Component, Fragment } from 'react';
import HeaderGuest from '../../components/HeaderGuest/index';
import { Posts } from './Posts/index'
import './styles/styles.css';

interface IPostObject {
	title: string
	author: string
	date: string
	link: string
}

interface IState {
	search: string
	testSearch: string
	focus: boolean
	posts: IPostObject[]
}

export default class Blog extends Component<{}, IState> {

	public state = {
		search: '',
		testSearch: '',
		focus: false,
		posts: Posts
	}

	public handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({search : e.target.value})
	}
	public handleTestSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({testSearch : e.target.value})
	}

	public handleFocus = () => {
		this.setState((prevState) => ({
			focus: !prevState.focus
		}));
	}

	public render() {
		return (
			<Fragment>
				<HeaderGuest
					menu={[
					{ name: "Company", url: "/about/company" },
					{ name: "Team", url: "/about/team" }
					]}
				/>
					<div className='header'>
							<span className='heading'>Atschool Blog Posts</span>
							{/* <div className={'search-container'+(this.state.focus ? ' fade': '')}>
								<Icon type="search" />
								<div className='search'>
									<input
										type="text"
										className="old"
										onChange={this.handleSearch}
										onFocus={this.handleFocus}
										onBlur={this.handleFocus}
										placeholder='Search posts'
									/>
								</div>
							</div> */}
						<div className='search-outer-container'>
							<Icon type="search" />
							<div className='search-inner-container'>
								<input
									type='text'
									onChange={this.handleSearch}
									onFocus={this.handleFocus}
									onBlur={this.handleFocus}
									placeholder='Search posts'
								/>
							</div>
						</div>
					</div>
					<div className='main-container'>
						<div className="post-container">
									{this.state.posts.map((post, index) => {
										if( post.title.includes(this.state.search.toLowerCase()) ) {
											return <div key={index} className='post'>
																<div className='post-content'>
																	<a href={'/'+post.link}>{post.title}</a>
																	<h4>{post.date}</h4>
																	<h5>{post.author}</h5>
																</div>
														</div>
											} return false
									}
								)}
							</div>
						</div>
			</Fragment>
		)
	}
}
