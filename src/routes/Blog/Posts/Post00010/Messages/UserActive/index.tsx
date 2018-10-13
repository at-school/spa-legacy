import React from "react";
import createSubSection from "../../../HOC/createSubSection";

const UserActive = () => {
  return (
    <div>
      <img width="100%" src="/blog/10/user-active.gif" />
      <div>
        Now, users can track the other users active. In messaging, if the user
        logs out, other users will get notified. If the user logs in, the all
        users in the chatrooms will get notified as well. We do know this
        violates the users privacy, so we will release the settings page soon
        where users can change that option.
      </div>
    </div>
  );
};

export default createSubSection("Track users", UserActive);
