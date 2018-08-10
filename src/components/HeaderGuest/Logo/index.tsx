import React from "react";

const Header = () => (
  <div className="logo" style={{ height: "64px", paddingLeft: "24px" }}>
    <a href="/">
      <img src="/logo1.png" alt="Logo" />
      <h1>
        <span className="at">@</span> School
      </h1>
    </a>
  </div>
);

export default Header;
