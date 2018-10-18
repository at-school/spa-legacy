import React from "react";

const EmailAuth = (props: any) => (
  <div
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <button onClick={props.getToken}>
      <h1>Add Mailbox +</h1>
    </button>
  </div>
);

export default EmailAuth;
