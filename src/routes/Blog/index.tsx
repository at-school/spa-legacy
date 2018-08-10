import React, { Component, Fragment } from 'react';
import './index.css';
import ONE from './Posts/12AUG18';

interface IState {
	search: string
	focus: boolean
}

export default class Blog extends Component<{}, IState> {

	public state = {
		search: '',
		focus: false
	}

	public updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({'search' : e.target.value})
	}

	public handleFocus = () => {
		console.log(this.state.focus)
		this.setState((prevState) => ({
			focus: !prevState.focus
		}));
	}

	public render() {
		return (
			<Fragment>
				<div className='header'>
					<span>Atschool Blog Post</span>
					<div className={'search'+( this.state.focus ? ' focus': '' )}>
						<i className='fas fa-search' />
						<input
							placeholder='Search posts'
							onChange={this.updateValue}
							onFocus={this.handleFocus}
							onBlur={this.handleFocus}
						/>
					</div>
				</div>
				<div>
					<ONE />
				</div>
			</Fragment>
		)
	}
}