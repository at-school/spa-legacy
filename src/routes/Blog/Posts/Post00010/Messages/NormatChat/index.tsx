import React from "react";
import createSubSection from "../../../HOC/createSubSection";

const NormalChat = () => {
  return (
    <div>
      <img width="100%" src="/blog/10/sending-receiving-messages.gif" />
      <div>
        Previously, our app already had this functionality it was quite slow.
		We discovered that the problem had came from the way we handled
        sockets. In the socket handler, instead of sending data from one user to
        another, we did it such that a certain user sent a signal to
        the socket handler, then the handler got all other needed data from the
        database, after sending it back to another user. This method resulted in
        approximately 4 seconds delay for a request as a pose to now which is almost instantaneous.
      </div>
    </div>
  );
};

export default createSubSection("Chat between user and user", NormalChat);
