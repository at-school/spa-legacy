import React from "react";
import { Route } from "react-router-dom";
import HeaderGuest from "../../components/HeaderGuest";
import AboutCompany from "./AboutCompany";
import AboutTeam from "./AboutTeam";
import "./styles/styles.css";

export default class About extends React.Component {
  public render() {
    return (
      <div className="about">
        <HeaderGuest
          menu={[
            { name: "Company", url: "/about/company" },
            { name: "Team", url: "/about/team" }
          ]}
        />
        <Route exact={true} path={"/about/company"} component={AboutCompany} />
        <Route exact={true} path={"/about/team"} component={AboutTeam} />
      </div>
    );
  }
}
