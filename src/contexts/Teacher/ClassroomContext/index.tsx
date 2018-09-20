import React from "react";

const ClassroomContext = React.createContext({} as IClassroomProviderStore);

interface IClassroomProviderStore {
  /** Private key for user to get data from the server */
  Id: string;
  name: string;
  description: string;
  avatar: string;
  line: string;
  students: IStudent[];
  schedule: ISchedule[];
  classId: string;
  scheduleId: string;
  getClassInfo: (lineId: string) => void;
}

interface IStudent {
  Id: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

interface ISchedule {
  line: string;
  startTime: string;
  endTime: string;
}

export const withClassroomContext = (Component: any) => (props: any) => (
  <ClassroomContext.Consumer>
    {value => <Component classroomContext={{ ...value }} {...props} />}
  </ClassroomContext.Consumer>
);

export default ClassroomContext;
