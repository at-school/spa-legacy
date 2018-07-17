import React from "react";
import ClassList from "./ClassList";
import "./styles/styles.css";

export default class Classroom extends React.Component {
  public render() {
    return (
      <div className="classroom">
        <ClassroomIntroduction />
        <ClassList />
      </div>
    );
  }
}

const ClassroomIntroduction = () => (
  <div className="classroom-introduction">
    <div className="classroom-introduction-container">
      <div>
        <div className="classroom-title">Classroom</div>
        <p>Seems like you do not have any classroom.</p>
        <p>Click the button below to add class.</p>
      </div>
      <img src="/computer-cartoon.png" alt="Computer cartoon" />
    </div>
  </div>
);
