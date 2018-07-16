import React from "react";

/**
 * Status text that is displayed under the spinner in the real-time roll call marking card.
 * After a certain amount of time, it will add or remove dot at the end of the text.
 */
export default class StatusText extends React.Component<
  {},
  { numberOfDots: number; currentDots: string }
> {
  public state = {
    numberOfDots: 0,
    currentDots: ""
  };

  private dotManagerInterval: any;

  public componentDidMount() {
    this.dotManagerInterval = setInterval(this.manageDot, 500);
  }

  public componentWillUnmount() {
    clearInterval(this.dotManagerInterval);
  }

  public render() {
    return <p className="status-text">Detecting {this.state.currentDots}</p>;
  }

  /** Function that handles add or remove dot from the text/state */
  private manageDot = () => {
    let dots = "";
    for (let i = 0; i < this.state.numberOfDots; i++) {
      dots += ".";
    }
    if (this.state.numberOfDots === 3) {
      this.setState({ numberOfDots: 0 });
    } else {
      this.setState({ numberOfDots: this.state.numberOfDots + 1 });
    }
    this.setState({ currentDots: dots });
  };
}
