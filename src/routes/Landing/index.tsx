import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <ul>
    <li>
      <Link to="authentication/signin">Sign in</Link>
    </li>
    <li>
      <Link to="authentication/register">Register</Link>
    </li>
    <li>
      <Link to="teacher/dashboard">Teacher</Link>
    </li>
  </ul>
);

export default Landing;
