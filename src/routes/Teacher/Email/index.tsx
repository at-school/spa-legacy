import { Icon } from "antd"
import {css, StyleSheet} from "aphrodite"
import React, { Fragment } from "react";
import AppContext from "../../../contexts/AppContext";


const { Consumer, Provider } = React.createContext({} as INavItem)

interface INavItem {
	active: any,
	handleClick: any,
	menu: any,
	inbox: any,
	item: any,
	mail: any
}

class Email extends React.Component<any> {

	public state = {
		active: 0,
		menu: [
				{
					"text": "New Message",
					"icon": "plus",
					"style": "left"
				},
				{
					"text": "Delete",
					"icon": "delete"
				},
				{
					"text": "Junk",
					"icon": "stop"
				},
			],
		inbox: [
			{
				"text": "Inbox",
				"icon": "inbox"
			},
			{
				"text": "Drafts",
				"icon": "edit"
			},
			{
				"text": "Sent",
				"icon": "paper-clip"
			},
			{
				"text": "Deleted",
				"icon": "delete"
			},
			{
				"text": "New folder",
				"icon": ""
			},
		],
		mail: [
			{
				"from": "charl",
				"subject": "hello",
				"plain": "here is some plain text",
				"time": "Fri 10:02 PM"
			},
			{
				"from": "charl",
				"subject": "hello",
				"plain": "here is some plain text",
				"time": "Fri 10:02 PM"
			},
			{
				"from": "charl",
				"subject": "hello",
				"plain": "here is some plain text",
				"time": "Fri 10:02 PM"
			}
		]
	}

	public handleClick = (index: any) => () => {
		console.log("clicked", index)
		this.setState({ active: index })
	}

	public render() {
		return (
			<div className={css(styles.outerContainer)}>
				<div className={css(styles.topNav)}>
					<Provider value={{
							...this.state,
							handleClick: this.handleClick,
							item: "menu",
						}}
					>
						<NavItem/>
					</Provider>
				</div>
				<div className={css(styles.content)}>
					<div className={css(styles.left)}>
						<div className={css(styles.inboxes)}>
							<Provider value={{
								...this.state,
								handleClick:
								this.handleClick,
								item: "inbox"
							}}>
								<InboxItem />
							</Provider>
						</div>
					</div>
					<div className={css(styles.messages)}>
							<div className={css(styles.mailHeader)}>
								<div className={css(styles.sort)}>
									<span>Sort</span>
									<Icon type="sort-ascending"/>
								</div>
								<div className={css(styles.filter)}>
									<span>Filter</span>
									<Icon type="filter"/>
								</div>
							</div>

							<Provider value={{
								...this.state,
								handleClick:
								this.handleClick,
								item: "inbox"
							}}>
								<MailItem />
							</Provider>
					</div>

					<div className={css(styles.bodies)}/>
				</div>
			</div>
		);
	}
}

const Item = (props: any) => (
	<div
		className={css(styles.item)}
	>
		<Icon type={props.icon}/>
		<span>
			{props.text}
		</span>
	</div>
)

const MailItem = () => (
	<Consumer>
		{ value =>
			<Fragment>
				{ value.mail.map( (item: any, index: number) =>
					<div key={index}>
						<span>{item.from}</span>
						<span>{item.subject}</span>
						<span>{item.plain}</span>
					</div>
				)}
			</Fragment>
		}
	</Consumer>
)

const NavItem = () => (
	<Consumer>
		{ value =>
			<Fragment>
				{ value[value.item].map( (item: any, index: number) =>
					<div key={index} className={css(styles[(item.style ? item.style : "" )])}>
						<Item icon={item.icon} text={item.text} class=""/>
					</div>
				)}
			</Fragment>
		}
	</Consumer>
)

const InboxItem = () => (
	<Consumer>
		{ value =>
			<Fragment>
				{ value[value.item].map( (item: any, index: number) =>
					<div
						key={index}
						className={css(styles.inboxItem, (value.active === index && styles.active))}
						onClick={value.handleClick(index)}
					>
						<Item icon={item.icon} text={item.text} class=""/>
					</div>
				)}
			</Fragment>
		}
	</Consumer>
)

export default (props: any) => (
  <AppContext.Consumer>
	{value => <Email {...props} accessToken={value.token} />}
  </AppContext.Consumer>
);

const blue = "rgba(3, 131, 220, 1)"
const lightBlue = "rgba(187, 219, 244, 0.5)"
const gray = "rgb(245,245,245)"
const grayBorder = "solid 1px rgb(230,230,230)"

const styles = StyleSheet.create({
	active: {
		color: blue,
		backgroundColor: lightBlue
	},
	mailHeader: {
		height: "50px",
		display: "flex",
		alignItems: "center",
		color: blue,
	},
	sort: {
		float: "left"
	},
	filter: {
		float: "right"
	},
	outerContainer: {
		margin: "-48px -24px",
		height: "calc(100% + 96px)",
	},
	topNav: {
		width: "100%",
		backgroundColor: gray,
		borderBottom: grayBorder,
		height: "50px",
		display: "flex",
		alignItems: "center",
		color: blue,
	},
	content: {
		display: "flex",
		flesDirection: "row",
		height: "calc(100% - 50px)",
		width: "100%"
	},
	left: {
		width: "20%",
		minWidth: "150px"
	},
	inboxes: {
		height: "100%",
		backgroundColor: gray,
		borderRight: grayBorder
	},
	inboxItem: {
		height: "50px",
		display: "flex",
		alignItems: "center",
		":hover": {
			backgroundColor: "rgba(187, 219, 244, 0.1)",
			cursor: "pointer"
		}
	},
	messages: {
		height: "100%",
		width: "30%",
		minWidth: "225px",
		backgroundColor: "white",
		borderBottom: grayBorder
	},
	bodies: {
		height: "100%",
		width: "50%",
		minWidth: "375px",
		backgroundColor: gray
	},
	item: {
		paddingLeft: "20px",
		":hover" : {
			cursor: "pointer",
		}
	}
})