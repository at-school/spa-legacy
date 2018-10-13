import React from "react";
import createSubSection from "../../../HOC/createSubSection";

const ExternalWindow = () => {
  return (
    <div>
      <img width="100%" src="/blog/10/external-chatwindow.gif" />
      <div>
        As the name indicates, we have made an external chat window that is
        available in every single route apart from messaging. Users now don't
        have to go to only one route to view the messages. This external chat
        window has the same functionalities as the main chat except for managing
        chat rooms (removeing and adding).
      </div>
    </div>
  );
};

export default createSubSection("External chat window", ExternalWindow);
