import React from "react";
import Webcam from "react-webcam";
import AppContext from "../../../../../../contexts/AppContext";

const uploadImage = async (imageData: any, token: string) => {
  const response = await fetch("http://127.0.0.1:5000/camera/upload", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ imageData })
  });
  const data = await response.json();
  console.log("Data received ");
  console.log(data);
  if (data.success) {
    return data;
  }

  const errMessage = await data.message;
  throw new Error(errMessage);
};

class Camera extends React.Component<any, any> {
  public state = {
    sendImage: null
  };

  public sendImageInterval: any;

  private webcam: any;

  public setRef = (webcam: any) => {
    this.webcam = webcam;
  };
  public capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    return imageSrc;
  };
  public upload() {
    const imageSrc = this.webcam.getScreenshot();
    if (imageSrc) {
      uploadImage(imageSrc, this.props.token)
        .then(data => this.props.markStudents(data.peopleFound))
        .catch(err => console.log(err));
    }
  }
  public componentDidMount() {
    this.sendImageInterval = setInterval(() => this.upload(), 500);
  }
  public componentWillUnmount() {
    clearInterval(this.sendImageInterval);
  }
  public render() {
    return (
      <div style={{ position: "fixed", zIndex: -1, visibility: "hidden" }}>
        <Webcam
          audio={false}
          ref={this.setRef}
          width="100%"
          screenshotFormat="image/jpeg"
        />
      </div>
    );
  }
}

export default (props: any) => (
  <AppContext.Consumer>
    {value => <Camera {...props} token={value.token} />}
  </AppContext.Consumer>
);
