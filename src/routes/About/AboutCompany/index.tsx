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
    );
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
  <Timeline>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item color="green">
      Solve initial network problems 2015-09-01
    </Timeline.Item>
    <Timeline.Item
      dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
    >
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </Timeline.Item>
    <Timeline.Item color="red">
      Network problems being solved 2015-09-01
    </Timeline.Item>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item
      dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
    >
      Technical testing 2015-09-01
    </Timeline.Item>
  </Timeline>
);
