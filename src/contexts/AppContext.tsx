import React from "react";

const AppContext = React.createContext({} as IAppProviderStore);

interface IAppProviderStore {
  userInfo?: IUserInfo;
}

interface IUserInfo {
  /** Private key for user to get data from the server */
  token: string;
  userAvatar: string;
  /** Access level of the user: 1 is student, 2 is teacher */
  accessLevel: number;
}

export default AppContext;
