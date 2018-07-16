import React from "react";
import Webcam from "react-webcam";

export default class Camera extends React.Component {
  public state = {
    sendImage: null
  };

  private webcam: any;

  public setRef = (webcam: any) => {
    this.webcam = webcam;
  };
  public capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    return imageSrc;
  };
  //   upload() {
  //     const imageSrc = this.webcam.getScreenshot();
  //     if (imageSrc !== null) uploadImage(imageSrc);
  //   }
  //   componentDidMount() {
  //     let sendImage = setInterval(() => this.upload(), 500);
  //     this.setState({ sendImage });
  //   }
  //   componentWillUnmount() {
  //     clearInterval(this.state.sendImage);
  //   }
  public render() {
    return (
      <div>
        <Webcam
          style={{ display: "none" }}
          audio={false}
          ref={this.setRef}
          width="100%"
          screenshotFormat="image/jpeg"
        />
      </div>
    );
  }
}
