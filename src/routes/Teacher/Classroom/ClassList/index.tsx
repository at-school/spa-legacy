import { Card, Icon } from "antd";
import React from "react";
import AddClassForm from "./NewClassForm";

export default class ClassList extends React.Component {
  public state = {
    newClassFormVisible: false
  };

  public render() {
    return (
      <div>
        <div className="class-list">
          <Card
            onClick={this.toggleAddClassForm}
            className="class-card add-class-card"
          >
            <Icon type="plus" /> Card content
          </Card>
          <Card title="sdflsd" className="class-card">
            Card content
          </Card>
          <Card title="sdflsd" className="class-card">
            Card content
          </Card>
          <Card title="sdflsd" className="class-card">
            Card content
          </Card>
          <Card title="sdflsd" className="class-card">
            Card content
          </Card>
        </div>
        <AddClassForm visible={this.state.newClassFormVisible} />
      </div>
    );
  }

  private toggleAddClassForm = () => {
    this.setState({ newClassFormVisible: !this.state.newClassFormVisible });
  };
}
