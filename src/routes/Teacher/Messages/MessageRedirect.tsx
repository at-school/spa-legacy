import React from "react";
import { Redirect } from "react-router-dom";
import { withMessageContext } from "../../../contexts/MessageContext";

const MessageRedirect = (props: any) => {
  console.log(props);
  return <Redirect to="sdf" />;
};

export default withMessageContext(MessageRedirect);
