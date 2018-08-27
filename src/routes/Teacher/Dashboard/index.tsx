import React from "react";
import AppContext from "../../../contexts/AppContext";

class Dashboard extends React.Component<any> {
  public render() {
    return (
      <div>
        <h1>Hello</h1>
        <button onClick={this.onClick}>Get identity</button>
      </div>
    );
  }

  private onClick = () => {
    fetch("http://localhost:5000/protected", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.accessToken
      })
    })
      .then(data => data.json())
      .then(data => console.log(data));
  };
}

export default (props: any) => (
  <AppContext.Consumer>
    {value => <Dashboard {...props} accessToken={value.token} />}
  </AppContext.Consumer>
);
