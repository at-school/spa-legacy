import React from "react";
import AppContext from "../../../contexts/AppContext";
import DashboardCalendar from "./DashboardCalendar";

const Dashboard = ({ userId }: { userId: string }) => {
  return (
    <div>
      <DashboardCalendar userId={userId} />
    </div>
  );
};

export default (props: any) => (
  <AppContext.Consumer>
    {value => (
      <Dashboard userId={value.userId} {...props} accessToken={value.token} />
    )}
  </AppContext.Consumer>
);
