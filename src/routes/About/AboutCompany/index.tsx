import { Icon, Timeline } from "antd";
import React from "react";

export default class AboutCompany extends React.Component {
	public render() {
		return (
			<div className="about-company">
				<div className="about-company-intro">
					<div className="title">The @ School Story</div>
					<div className="subtitle">
						We know the schools. In fact, we are in it.
		  </div>
				</div>
				<div className="about-content">
					<CompanyMission />
					<CompanyTimeline />
				</div>
			</div>
		); // go down
	}
}

const CompanyMission = () => (
	<div className="company-mission">
		<div className="company-mission-content">
			<div className="title">Our Missions</div>
			<div className="subtitle">
				There are a plethora of learning management systems already in the
				market, google classroom, schoology, edmodo, why another, and why do you
				want to use it?
	  </div>
			<div className="description">
				Currently learning management systems are undeserving of the name, as
				they manage very little of the actually software used within the
				classroom. Teachers constantly have to learn unique systems for role
				taking, grade marking, communication and storing class data. At school
				takes all existing school related software and integrates them into one
				centralized system, allowing for teacher to spend more time interacting
				with students. @ School is aimed to take menial everyday tasks and
				automate them making all information easily accessible through
				simplistic applications.
	  </div>
		</div>
		<div className="company-mission-figure">
			<i className="fas fa-external-link-square-alt" />
		</div>
	</div>
);

const CompanyTimeline = () => (
	<div className="company-timeline">
		<div className="company-timeline-title">
			Real-time updates of developement
	</div>
		<CompanyTimelineLegend />
		<div className="company-timeline-container">
			<WebAppTimeline />
			<MobileAppTimeline />
			<ServerTimeline />
		</div>
	</div>
);

const WebAppTimeline = () => (
	<div className="company-timeline-item">
		<div className="title">Web App</div>

		<Timeline mode="alternate">
			<Timeline.Item color="green">
				Build basic layout and prototypes 2018-07-15
	  </Timeline.Item>
			<Timeline.Item color="green">
				Integrate facial recognition between the web and the server 2018-07-22
	  </Timeline.Item>
			<Timeline.Item color="green">
				Create basic classroom functions: add, edit, remove 2018-08-01
	  </Timeline.Item>
			<Timeline.Item color="green">
				Make chat app available in only one route 2018-08-08
	  </Timeline.Item>
			<Timeline.Item color="red">
				Make chat app accross the app once receiving oncoming messages
				2018-08-16 (1.5 weeks)
	  </Timeline.Item>
			<Timeline.Item color="blue">
				Create structures for students, classes, schools in a classroom.
				2018-08-19 (0.4 weeks)
	  </Timeline.Item>
			<Timeline.Item color="blue">
				Make the report of each individual student downloadable in PDF
				2018-09-01 (1 week)
	  </Timeline.Item>
			<Timeline.Item
				dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
			>
				Beta Release 2018-10-15
	  </Timeline.Item>
		</Timeline>
	</div>
);

const MobileAppTimeline = () => (
	<div className="company-timeline-item">
		<div className="title">Mobile App</div>
		<Timeline mode="alternate">
			<Timeline.Item color="blue">Build navigations 2018-07-09</Timeline.Item>
			<Timeline.Item color="blue">
				Create messaging route with mock data from randomuser.me 2018-07-11
	  </Timeline.Item>
			<Timeline.Item color="blue">
				Build route for users to upload their pictures for facial recognition in
				base64 data 2018-07-12
	  </Timeline.Item>
			<Timeline.Item color="red">
				Integrate chat app using Socket.IO 2018-08-31
	  </Timeline.Item>
			<Timeline.Item color="blue">
				Enable the ability to create and edit classroom 2018-08-31 (1 week)
	  </Timeline.Item>
			<Timeline.Item color="blue">
				Make the report of each individual student downloadable in PDF
				2018-09-08 (1 week)
	  </Timeline.Item>
			<Timeline.Item
				dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
			>
				Beta Release 2018-09-07
	  </Timeline.Item>
		</Timeline>
	</div>
);

const ServerTimeline = () => (
	<div className="company-timeline-item">
		<div className="title">Server</div>
		<Timeline mode="alternate">
			<Timeline.Item color="green">
				Create facial recognition 2018-07-15
	  </Timeline.Item>
			<Timeline.Item color="green">
				Basic database structure of users and schools 2018-07-20
	  </Timeline.Item>
			<Timeline.Item color="green">
				Build APIs to connect database to the applications 2018-07-23
	  </Timeline.Item>
			<Timeline.Item color="green">
				Create Chat socket using Socket.IO and integrate Emojfier into chat
				2018-07-30
	  </Timeline.Item>
			<Timeline.Item color="red">
				Build APIs to download and print reports for students as well as
				teachers 2018-08-20 (2 weeks)
	  </Timeline.Item>
			<Timeline.Item color="blue">
				Build new database model for all students marks and attendances
				2018-08-31 (2 weeks)
	  </Timeline.Item>
			<Timeline.Item
				dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
			>
				Deployment 2018-09-07
				* Dependent on finalisation of all prior deliverables and server *
	  </Timeline.Item>
		</Timeline>
	</div>
);

const CompanyTimelineLegend = () => (
	<div className="company-timeline-legend">
		<div className="color-container">
			<div className="green-figure color-figure" />
			<div className="color-description">Tasks that are completed</div>
		</div>
		<div className="color-container">
			<div className="blue-figure color-figure" />
			<div className="color-description">Tasks that are planned</div>
		</div>
		<div className="color-container">
			<div className="red-figure color-figure" />
			<div className="color-description">Tasks that are being done</div>
		</div>
	</div>
);
