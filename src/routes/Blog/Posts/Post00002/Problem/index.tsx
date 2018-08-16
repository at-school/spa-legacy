import React from "react";

export default class Problem extends React.Component {
  public render() {
    return (
      <div>
        <div className="title">Problem</div>
        <div className="description">
          When the app started growing in complexity, it becomes harder than
          ever to manage states of the application, and for @ school, some of
          the examples of state are:
          <ul>
            <li>Incoming and outgoing emails.</li>
            <li>Incoming and outgoing messages.</li>
            <li>Real time data of the classrooms and schools.</li>
          </ul>
          At the moment, our codebase is nearly ten thousand lines, so the
          feature that would generally take 2 days to develop, now taking 2
          weeks.
        </div>
      </div>
    );
  }
}
