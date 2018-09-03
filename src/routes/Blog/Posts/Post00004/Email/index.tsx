import React from "react";
import createSection from "../../HOC/createSection";

const Email = () => {
  return (
    <div>
      We have been creating an mailbox capable of accessing the smtp servers
      associated with schoolsnet and gmail. In order to do this we have taken
      advantages of the Gmail api, google’s restful api used for accessing gmail
      mailboxes. Although there seems to be an issue with loading time when
      extracting email information from a users mailbox. It takes on average
      8.23 seconds to load the subject, sender, receiver, and html body of the
      user's 20 most recent emails. Currently the functionality of the
      application consist of:
      <ul>
        <li>Sending emails</li>
        <li>Viewing mail data from all mailboxes</li>
      </ul>
      Nonetheless, The example code documented for python in the Gmail api is
      written in python 2.7, as such much of the code is outdated. This has
      resulted is us to learn much of inner workings, to re-write the code to
      support python 3. Furthermore, We are unable to view plain text message
      bodies only message bodies consisting of html.
    </div>
  );
};

export default createSection("Integrated email application", Email);
