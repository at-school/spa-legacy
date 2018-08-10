import React, { Component, Fragment } from 'react'
import HeaderGuest from '../../../components/HeaderGuest/index';
import './styles/styles.css'

export default class PostTemplate extends Component<{content: {}}> {
	public render() {
		return (
			<Fragment>
				<HeaderGuest
						menu={[
							{ name: "Company", url: "/about/company" },
							{ name: "Team", url: "/about/team" }
						]}
					/>
				<div
					style={{
						backgroundImage: `url('https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg')`,
						height: '400px'
						}}
				/>
				<div className='blog-outer-container'>
					<div className='blog-post-container'>
						{Object.keys(this.props.content).map((key, index) => {
							if(this.props.content[key] === 'title') {
								return <h1 key={index}>{key}</h1>
							} else if (this.props.content[key] === 'date') {
								return <h3 key={index}>{key}</h3>
							} else if (this.props.content[key] === 'author') {
								return <h4>{key}</h4>
							} else if(this.props.content[key] === 'paragraph') {
								return <p key={index}>{key}</p>
							}
							return false

						})}
					</div>
				</div>
			</Fragment>
		)
	}
}