import { Icon, message } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { withApollo } from "react-apollo";
import { editUserBio } from "../../../../../api/user";
import { getUserInfoQuery } from "../../queries";
import DetailsUserInfoBioInput from "./DetailsUserInfoBioInput";

class DetailsUserInfoBio extends React.Component<
  any,
  { bioEditable: boolean; bioValue: string }
> {
  public state = {
    bioEditable: false,
    bioValue: ""
  };

  public toggleBioEdit = () => {
    if (this.state.bioEditable) {
      this.setState({ bioEditable: false, bioValue: "" });
    } else {
      this.setState({ bioEditable: true });
    }
  };

  public onChangeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({ bioValue: e.target.value });

  public onConfirm = () => {
    if (this.state.bioValue && this.state.bioEditable) {
      editUserBio(this.state.bioValue, this.props.userId, this.props.token)
        .then(() => {
          const data = this.props.client.readQuery({
            query: getUserInfoQuery,
            variables: {
              Id: this.props.userId
            }
          });
          if (data && data.user && data.user.length > 0) {
            data.user[0].bio = this.state.bioValue;
            console.log(data.user[0])
            this.props.client.writeQuery({
              query: getUserInfoQuery,
              variables: {
                Id: this.props.userId
              },
              data
            });
            this.toggleBioEdit();
          }
        })
        .catch((err: any) => message.error(err.msg));
    }
  };

  public render() {
    const { bioEditable } = this.state;
    return (
      <React.Fragment>
        {!bioEditable && (
          <div className={css(styles.bioText)}>
            {this.props.bio ? this.props.bio : "Your bio will go here "}
            <Icon
              onClick={this.toggleBioEdit}
              style={{ color: "#1890ff" }}
              type="edit"
              theme="outlined"
            />
          </div>
        )}
        {bioEditable && (
          <DetailsUserInfoBioInput
            bioValue={this.state.bioValue}
            onChangeBio={this.onChangeBio}
            toggleBioEdit={this.toggleBioEdit}
            onConfirm={this.onConfirm}
          />
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  bioText: {
    fontWeight: "lighter",
    fontSize: "20px"
  }
});

export default withApollo(DetailsUserInfoBio);
