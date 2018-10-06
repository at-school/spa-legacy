import { Icon, Input, Tag, Tooltip } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { compose, graphql } from "react-apollo";
import AppContext from "../../../../../contexts/AppContext";
import { ISkillTagsProps, ISkillTagsWithContextProps, ISkillTagsWithGraphQlProps, IUser } from "../../interfaces";
import { createSkillMutation, getUserInfoQuery, removeSkillMutation } from "../../queries";

class SkillTags extends React.Component<ISkillTagsProps> {
  public state = {
    nameInputVisible: false,
    colorInputVisible: false,
    colorname: "",
    tagname: ""
  };

  private nameInputRef = React.createRef<Input>();
  private colorInputRef = React.createRef<Input>();

  public showInput = (field: string) => () => {
    if (field === "name") {
      this.setState(
        { nameInputVisible: true },
        () =>
          this.nameInputRef.current ? this.nameInputRef.current.focus() : {}
      );
    } else if (field === "color") {
      this.setState(
        { colorInputVisible: true },
        () =>
          this.colorInputRef.current ? this.colorInputRef.current.focus() : {}
      );
    }
  };

  public handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [field]: e.target.value });
  };

  public handleNameInputConfirm = () => {
    // submit all the tags to the server
    if (this.state.tagname) {
      this.setState({ nameInputVisible: false }, this.showInput("color"));
    }
  };

  public handleColorInputConfirm = () => {
    if (this.state.colorname && this.state.tagname) {
      this.props.createSkillMutation({
        variables: {
          name: this.state.tagname,
          color: this.state.colorname,
          userId: this.props.userId
        },
        update: (cache, mutation) => {
          const data =
            (cache.readQuery({
              query: getUserInfoQuery,
              variables: { Id: this.props.userId }
            }) as { user: IUser[] }) || null;
          if (data && data.user && data.user.length > 0) {
            data.user[0].skills.push(mutation.data.createSkill);
            cache.writeQuery({
              query: getUserInfoQuery,
              variables: { Id: this.props.userId },
              data
            });
          }
          this.handleInputBlur();
        }
      });
    }
  };

  public handleInputBlur = () => {
    // do something when inputting blur
    this.setState({
      nameInputVisible: false,
      colorInputVisible: false,
      colorname: "",
      tagname: ""
    });
  };

  public handleRemovingItem = (Id: string) => () => {
    this.props.removeSkillMutation({
      variables: { Id },
      update: cache => {
        const data =
          (cache.readQuery({
            query: getUserInfoQuery,
            variables: { Id: this.props.userId }
          }) as { user: IUser[] }) || null;
        if (data && data.user && data.user.length > 0) {
          data.user[0].skills = data.user[0].skills.filter(
            skill => skill.Id !== Id
          );
          cache.writeQuery({
            query: getUserInfoQuery,
            variables: { Id: this.props.userId },
            data
          });
        }
      }
    });
  };

  public render() {
    const {
      nameInputVisible,
      tagname,
      colorInputVisible,
      colorname,
    } = this.state;
    return (
      <div>
        {this.props.skills.map(skill => {
          const isLongTag = skill.name.length > 20;
          const tagElem = (
            <Tag
              className={css(styles.tag)}
              key={skill.Id}
              closable={true}
              color={skill.color}
              onClose={this.handleRemovingItem(skill.Id)}
            >
              {isLongTag ? `${skill.name.slice(0, 20)}...` : skill.name}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={skill.name} key={skill.Id}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {this.props.self && (
          <React.Fragment>
            {nameInputVisible && (
              <Input
                ref={this.nameInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={tagname}
                onChange={this.handleInputChange("tagname")}
                onBlur={this.handleInputBlur}
                onPressEnter={this.handleNameInputConfirm}
                placeholder="Tag name"
              />
            )}
            {colorInputVisible && (
              <Input
                ref={this.colorInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={colorname}
                onChange={this.handleInputChange("colorname")}
                onBlur={this.handleInputBlur}
                onPressEnter={this.handleColorInputConfirm}
                placeholder="Color name"
              />
            )}
            {!(nameInputVisible || colorInputVisible) && (
              <Tag
                onClick={this.showInput("name")}
                style={{ background: "#fff", borderStyle: "dashed" }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const SkillTagsWithGraphQl = compose(
  graphql(createSkillMutation, {
    name: "createSkillMutation"
  }),
  graphql(removeSkillMutation, { name: "removeSkillMutation" })
)(SkillTags as any) as React.ComponentClass<ISkillTagsWithGraphQlProps>;

const SkillTagsWithContext: React.SFC<ISkillTagsWithContextProps> = ({
  skills,
  self
}) => (
  <AppContext.Consumer>
    {value => <SkillTagsWithGraphQl self={self} skills={skills} userId={value.userId!} />}
  </AppContext.Consumer>
);

const styles = StyleSheet.create({
  tag: {
    marginBottom: "8px"
  }
});

export default SkillTagsWithContext;
