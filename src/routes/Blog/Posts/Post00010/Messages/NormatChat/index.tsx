import React from "react";
import createSubSection from "../../../HOC/createSubSection";

const NormalChat = () => {
  return (
    <div>
      <img width="100%" src="/blog/10/sending-receiving-messages.gif" />
      <div>
        Previous, our app already had this functionality. Nonetheless, it was
        slow. We had discovered that the problem came from the way we handled
        socket. In the socket handler, instead of sending data from one user to
        another user, we did it in a way so that a certain user sent a signal to
        the socket handler, then the handler will get data other needed from the
        database, after, sending back to another user. This method results in
        approximately 4 seconds delay for a request. Now it is almost instant.
      </div>
    </div>
  );
};

export default createSubSection("Chat between user and user", NormalChat);
