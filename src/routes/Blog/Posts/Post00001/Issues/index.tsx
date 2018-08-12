import React from "react";

const Issues = () => (
  <div className="issues">
    <div className="title">Initial Issues and Constraints</div>
    <div className="description">
      <div className="issues-server">
        <div className="subtitle">Server</div>
        <div className="description-subitem">
          Facial recognition, requires an APIs call from the client to server
          every 200ms. Also needs excellent performance in order to
          simultaneously take the APIs and do the required ML calculations.
          Server providers that offer such computing power are well out of our
          price range. While this may not effect the actual development phase it
          will affect the integrity of the beta release and therefore compromise
          the ultimate goal of project.
        </div>
      </div>
      <div className="issues-members">
        <div className="subtitle">Limited team members</div>
        <div className="description-subitem">
          Our team consists of three members that lack in diversity, the skills
          of each team member reside in similar domains and often intersect. Our
          team lacks the appropriate skills in business, marketing, law and most
          importantly someone who specializes in security. Security is a major
          concern within the project as we will be dealing with sensitive
          information safeguarded by law. We will also have access to government
          databases. This makes security specialist an essential part of out
          personal, and to the success of the product. Although such a
          specialist is hardly needed within the initial phases of the project
          and first beta, they will be invaluable in the actual release. The
          same can be said for specialists in business and law..
        </div>
      </div>
      <div className="issues-budget">
        <div className="subtitle">Budget</div>
        <div className="description-subitem">
          The project is being privately funded by our team and as such it
          difficult to acquire the adequate resources to facilitate our demands.
        </div>
      </div>
    </div>
  </div>
);

export default Issues;
