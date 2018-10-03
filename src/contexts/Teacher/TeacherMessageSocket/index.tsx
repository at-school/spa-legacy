import React from "react";

const TeacherMessageSocket = React.createContext({} as IAppProviderStore);

interface IAppProviderStore {
  socket: any;
  selectedRoomId: string;
  changeSelectedRoomId: (selectedRoomId: string) => void;
}

export default TeacherMessageSocket;
