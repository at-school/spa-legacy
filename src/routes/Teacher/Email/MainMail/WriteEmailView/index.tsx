import { Button, Input } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import LzEditor from "react-lz-editor";
import "./index.css";
class WriteEmailView extends React.Component<{
  accessToken: string;
  handleClick: any;
}> {
  public state = {
    htmlContent: "",
    responseList: [],
    email: "",
    subject: ""
  };

  public receiveHtml = (htmlContent: string) => {
    this.setState({ htmlContent });
    this.setState({ responseList: [] });
  };
  public sendMail = async () => {
    const mailAuth = await fetch(process.env.REACT_APP_LOCAL_URI + "sendmail", {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.props.accessToken
      },
      body: JSON.stringify({
        mailData: this.state.htmlContent,
        subject: this.state.subject,
        email: this.state.email
      }),
      method: "POST"
    }).then(() => {
      console.log("Getting data");
      this.props.handleClick(1, "inbox")();
    });
    console.log(mailAuth);
  };
  public changeMetaData = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [field]: e.target.value });
  };

  public componentWillUnmount() {
    this.setState({ htmlContent: "", email: "", subject: "" });
  }

  public render() {
    const uploadProps = {
      action: "http://v0.api.upyun.com/devopee",
      listType: "picture",
      fileList: this.state.responseList,
      data: (file: any) => {
        // do something
      },
      multiple: true,
      showUploadList: true
    };

    return (
      <div className={css(styles.mainContainer)}>
        <div className={css(styles.metaDataContainer)}>
          <Input
            onChange={this.changeMetaData("email")}
            placeholder="Receiver"
          />
          <Input
            onChange={this.changeMetaData("subject")}
            className={css(styles.middleInput)}
            placeholder="Email Subject"
          />
          <Button
            disabled={!Boolean(this.state.email)}
            onClick={this.sendMail}
            type="primary"
          >
            Send
          </Button>
        </div>
        <LzEditor
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          uploadProps={uploadProps}
          lang="en"
          fullScreen={false}
        />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  metaDataContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "28px 16px"
  },
  middleInput: {
    marginRight: 18,
    marginLeft: 18
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    zIndex: 0,
    flex: 0.8
  }
});

export default WriteEmailView;
