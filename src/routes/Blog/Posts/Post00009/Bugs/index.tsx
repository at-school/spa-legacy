import React from "react";
import createSection from "../../HOC/createSection";

const Bugs = () => {
  return (
    <ul>
      <li>
        Fixed PyMail recursive function to work for all email types, after being tested with
		over a thousand unique emails.
      </li>
      <li>
        Made computer vision instantaneous by changing the location of the image
		encodings from the database to local files.
      </li>
    </ul>
  );
};

export default createSection("Bugs fixed", Bugs);
