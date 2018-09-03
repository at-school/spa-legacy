import React from "react";
import createSection from "../../HOC/createSection";

const Problem = () => {
  return (
    <div>
      There are countless number of problems that we've faced. Here are some of
      the major one that slow the plan dramatically:
      <ul>
        <li>
          Familiarise ourselves with Apollo Client which is a GraphQL Client in
          React
        </li>
        <li>
          Move all functionalities of the app to GraphQl, remove all existing
          Rest APIs code.
        </li>
        <li>
          Build a No-SQL database wrapper as done previously, through
          SQLAlchemy, we could get model wrappers from the database itself.
        </li>
      </ul>
    </div>
  );
};

export default createSection("The Problem", Problem);
