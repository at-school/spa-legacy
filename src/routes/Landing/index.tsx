import React from "react";
import MainLandingLayout from "./MainLandingLayout";
import "./styles/styles.css";

export default class Landing extends React.Component {
  private introRef = HTMLDivElement as any;

  // set reference to the div after main introduction (clouds)
  public setIntroRef = (ref: HTMLDivElement) => {
    this.introRef = ref;
  };

  // scrolling into the content
  public scrollIntoIntro = () => {
    this.introRef.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  };

  public render() {
    return (
      <MainLandingLayout
        scrollIntoIntro={this.scrollIntoIntro}
        setIntroRef={this.setIntroRef}
      />
    );
  }
}
