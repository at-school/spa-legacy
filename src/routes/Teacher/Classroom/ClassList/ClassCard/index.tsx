import { Avatar, Card } from "antd";
import React from "react";

interface IClassCardProps {
  // callback when user wants to close or open edit class form
  toggleEditClassForm: () => void;
  // invoke when user clicks on remove class
  removeClass: () => void;
  avatar: string;
  name: string;
  description: string;
}

const ClassCard: React.SFC<IClassCardProps> = ({
  toggleEditClassForm,
  removeClass,
  avatar,
  name,
  description
}) => (
  <Card
    hoverable={true}
    className="class-card"
    actions={[
      <div key="edit-class" onClick={toggleEditClassForm}>
        Edit class
      </div>,
      <div key="remove-class" onClick={removeClass}>
        Remove class
      </div>
    ]}
  >
    <div className="class-card-body">
      <div className="class-card-avatar">
        <Avatar src={avatar} shape="circle" size="large" />
      </div>
      <div className="class-card-content">
        <div className="class-card-content-title">{name}</div>
        <div className="class-card-content-description">{description}</div>
      </div>
    </div>
  </Card>
);

export default ClassCard;
