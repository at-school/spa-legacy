import React from "react";

const TeacherMessageSocket = React.createContext({} as IAppProviderStore);

interface IAppProviderStore {
  socket: any;
}

export default TeacherMessageSocket;
