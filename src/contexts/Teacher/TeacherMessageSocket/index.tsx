import React from "react";

const TeacherMessageSocket = React.createContext({} as IAppProviderStore);

interface IAppProviderStore {
  socket: any;
  chatrooms: any;
  changeSelectedRoomId: (selectedRoomId: string) => void;
  selectedRoomId: string;
}

export const withTeacherMessageSocket = (Component: any) => (props: any) => (
  <TeacherMessageSocket.Consumer>
    {value => <Component teacherMessageSocket={{ ...value }} {...props} />}
  </TeacherMessageSocket.Consumer>
);

export default TeacherMessageSocket;
