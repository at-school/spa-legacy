import { Icon, Spin, } from "antd";
import { css, StyleSheet } from "aphrodite";
import React, { Fragment } from "react";
import AppContext from "../../../contexts/AppContext";

const { Consumer, Provider } = React.createContext({} as INavItem);

interface INavItem {
	activeInbox: number
	activeMail: number,
	addMailbox?: boolean,
	menu: any
	inbox: any
	handleClick: any
	item: any;
	mailData?: any
	getDate?: any
	loading?: any
	setup?: any
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
	'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const testArr = Array(25).fill(0).map((_, i) => i)
console.log('TESTARRAY', testArr)

class Email extends React.Component<any> {
	public state = {
		setup: false,
		addMailbox: false,
		loading: true,
		activeInbox: 0,
		activeMail: 0,
		mailData: [
				{
					from: "charl",
					Subject: "hello",
					plain: "here is some plain text",
					time: "Fri 10:02 PM",
					type: "pushpin"
				},
				{
					from: "charl",
					Subject: "hello",
					plain: "here is some plain text",
					time: "Fri 10:02 PM"
				},
				{
					from: "charl",
					Subject: "hello",
					plain: "here is some plain text",
					time: "Fri 10:02 PM",
					type: "flag"
				}
		],
		menu: [
			{
				text: "New Message",
				icon: "plus",
				style: "left"
			},
			{
				text: "Delete",
				icon: "delete"
			},
			{
				text: "Junk",
				icon: "stop"
			}
		],
		inbox: [
			{
				text: "Inbox",
				icon: "inbox"
			},
			{
				text: "Drafts",
				icon: "edit"
			},
			{
				text: "Sent",
				icon: "paper-clip"
			},
			{
				text: "Deleted",
				icon: "delete"
			},
			{
				text: "New Folder"
			}
		],
	};

	public componentDidMount() {
		this.GetMailData();
	}

	public GetMailData = async (visited=false) => {
		console.log("testing mail data")
		const mailAuth = await fetch("http://localhost:5000/getmail", {
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + this.props.accessToken
			},
			body: JSON.stringify({
				studentId: this.props.userId,
				visited
			}),
			method: "POST"
		}).then(res => res.json())
		if (mailAuth.response === "first-time") {
			console.log('1')
			this.setState({ setup: true, addMailbox: false })
			this.GetMailData(visited=true)
		}
		else if (mailAuth.response === "auth") {
			console.log('2')
			this.setState({addMailbox: true})
		} else {
			console.log("3")
			this.setState({mailData: mailAuth})
			setTimeout(() => (this.setState({ setup: false })), 5000)
		}
		this.setState({loading: true})
	}

	public getToken = () => {
		window.location.replace("http://localhost:5000/authorize?id="
				+ this.props.userId)
	}

	public handleClick = (index: any, key: any) => () => {
		console.log("clicked", index);
		if (key === "inbox") {
			this.setState({ activeInbox: index });
		} else {
			this.setState({ activeMail: index });
		}
	};

	public getDate = (oldDate: string) => {
		const date = new Date(oldDate)
		return months[date.getMonth()].toString() + " " + date.getDate()
	}

	public render() {
		return (
			<Provider value={{
				...this.state,
				handleClick: this.handleClick,
				getDate: this.getDate,
				item: "menu",
			}}
			>
				{
					this.state.loading === true
					?
					<Loading />
					:
					this.state.setup === true ?
					<Setup />
					:
					this.state.addMailbox === true ?
					<AddMailbox getToken={this.getToken}/>
					:
					<MailApp />
				}
			</Provider>
			);
		}
}

const Setup = () => (
	<div
		style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
	>
		<h1>
			Setting up mailbox ...
		</h1>
	</div>
)

const AddMailbox = (props: any) => (
	<div
		style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
	>
		<button onClick={props.getToken}>
			<h1>
				Add Mailbox +
			</h1>
		</button>
	</div>
)

const Loading = () => (
	<div
		className={css(styles.outerContainer)}
		style={{
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center"
		}}
	>
		<span
			style={{ fontSize: "30px" }}
		>
			Loading
		</span>
		<br/>
		<Spin indicator={
			<Icon
				type="loading"
				style={{ fontSize: 50 }}
				spin={true}
			/>}
		/>
	</div>
)

const MailApp = () => (
	<Consumer>
		{ value =>
		<div className={css(styles.outerContainer)}>
				<div className={css(styles.topNav)}>
					<Provider value={{
						...value
					}} >
						<NavItem />
					</Provider>

				</div>
				<div className={css(styles.content)}>
					<div className={css(styles.left)}>
						<div className={css(styles.inboxes)}>
							<Provider value={{
								...value
							}}>
								<InboxItem />
							</Provider>
						</div>
					</div>
					<div className={css(styles.messageWrapper)}>
						<div className={css(styles.mailHeader)}>
							<div>
								<span>Sort</span>
								<Icon type="sort-ascending" />
							</div>
							<div className={css(styles.filter)}>
								<span>Filter</span>
								<Icon type="filter" />
							</div>
						</div>
						<div className={css(styles.messagesContainer)}>
							<div className={css(styles.messages)}>
								<Provider value={{
									...value
								}}>
									<MailItem date={value.getDate} />
								</Provider>
							</div>
						</div>
					</div>
					<div className={css(styles.bodies)}>
						<div className={css(styles.bodyHead)}>
						{
							console.log("The lask mail",value.mailData)
						}
							{ "Subject" in value.mailData[value.activeMail] &&
							value.mailData[value.activeMail].Subject }
						</div>
						<div className={css(styles.body)}
							dangerouslySetInnerHTML=
							{{ __html: value.mailData[value.activeMail].html }}
						/>
					</div>
				</div>
			</div>
			}
		</Consumer>
)

const Item = (props: any) => (
	<div className={css(styles.item)}>
		{
			props.icon ?
				<Icon type={props.icon} style={{ fontSize: "17.5px" }} />
				:
				<span style={{ width: "17.5px" }} />
		}
		<span style={{
			paddingLeft: "10px",
			color: (props.text === "New Folder" ? blue : "")
		}}>
			{props.text}
		</span>
	</div>
)

const MailItem = (props: any) => (
	<Consumer>
		{value =>
			<Fragment>
				{value.mailData.map((item: any, index: number) => // .slice(0, 20)
					<div
						key={index}
						className={css(styles.mailItem,
							(value.activeMail === index && styles.active))}
						style={{
							borderBottom:
								(index + 1 === value.mailData.length ?
									`solid 1px ${gray}`
									:
									'none'
								)
						}}
						onClick={value.handleClick(index, 'mail')}
					>
						<div>
							{
								item.timeDate
							}
						</div>
						<div>
							<span><strong>{item.From}</strong></span>
							<span
								style={{ float: "right" }}
								className={css(styles.date)}
							>
								{props.date(item.dateTime)}
							</span>
							{item.type &&
								<span style={{ float: "right" }}>
									<Icon type={item.type} />
								</span>
							}
						</div>
						<div className={css(styles.middle)}>
							<div className={css(styles.subject)}>
								<div className={css(styles.subjectSpan)}>
									{item.Subject}
								</div>
							</div>
						</div>
						<span>{item.plain}</span>
					</div>
				)}
			</Fragment>
		}
	</Consumer>
)

const NavItem = () => (
	<Consumer>
		{value =>
			<Fragment>
				{value[value.item].map((item: any, index: number) =>
					<div
						key={index}
						className={css(styles[(item.style ? item.style : "")])}
					>
						<Item icon={item.icon} text={item.text} />
					</div>
				)}
			</Fragment>
		}
	</Consumer>
)

const InboxItem = () => (
	<Consumer>
		{value => (
			<Fragment>
				{value[value.item].map((item: any, index: number) => (
					<div
						key={index}
						className={css(
							styles.inboxItem,
							value.activeInbox === index && styles.active
						)}
						onClick={value.handleClick(index, "inbox")}
					>
						<Item icon={item.icon} text={item.text} class="" />
					</div>
				))}
			</Fragment>
		)}
	</Consumer>
);

export default (props: any) => (
	<AppContext.Consumer>
		{value => (
			<Email userId={value.userId} {...props} accessToken={value.token} />
		)}
	</AppContext.Consumer>
);

const blue = "rgba(3, 131, 220, 1)"
const lightBlue = "rgba(187, 219, 244, 0.5)"
const gray = "rgb(240,242,245)"
const grayBorder = "solid 1px rgb(230,230,230)"

const styles = StyleSheet.create({
	middle: {

	},
	active: {
		color: blue,
		backgroundColor: lightBlue
	},
	filter: {
		marginLeft: "50px"
	},
	outerContainer: {
		margin: "-48px -24px",
		height: "calc(100vh - 64px)",
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
		flexDirection: "row",
		height: "calc(100% - 50px)",
		width: "100%"
	},
	left: {
		width: "20%",
		minWidth: "150px"
	},
	inboxes: {
		height: "100%",
		maxHeight: "100%",
		backgroundColor: gray,
		borderRight: grayBorder
	},
	inboxItem: {
		height: "54px",
		display: "flex",
		alignItems: "center",
		":hover": {
			backgroundColor: "rgba(187, 219, 244, 0.1)",
			cursor: "pointer"
		}
	},
	messageWrapper: {
		height: "100%",
		width: "25%",
		minWidth: "225px",
		backgroundColor: "white",
		borderBottom: grayBorder,
		borderRight: grayBorder,
		overflow: "hidden",
		postition: "absolute"
	},
	mailHeader: {
		height: "54px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: blue,
		borderBottom: grayBorder,
	},
	messagesContainer: {
		height: "100%"
	},
	messages: {
		height: "100%",
		marginBottom: "50px",
		overflowY: "scroll",
	},
	mailItem: {
		height: '65px',
		cursor: "pointer",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: "10px 20px",
		lineHeight: "1.2",
		borderBottom: `1px solid ${gray}`,
	},
	subject: {
		overflow: "hidden",
		maxHeight: "16px",
		position: 'relative'
	},
	subjectSpan: {
		width: "100%",
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap"
	},
	date: {
		color: "rgb(100,100,100)",
		fontSize: '14px'
	},
	bodies: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "60%",
		minWidth: "375px",
		backgroundColor: gray,
		overflow: "scroll"
	},
	bodyHead: {
		display: "flex",
		alignItems: "center",
		backgroundColor: gray,
		fontWeight: "bold",
		fontSize: "18px",
		height: "54px"
	},
	body: {
		backgroundColor: "white",
		width: "95%",
		maxHeight: "925px",
		overflow: "scroll"
	},
	item: {
		display: "flex",
		alignItems: "center",
		paddingLeft: "20px",
		":hover": {
			cursor: "pointer",
		}
	}
})
