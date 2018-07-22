import React from "react";

const AppContext = React.createContext({} as IAppProviderStore);

interface IAppProviderStore {
  /** Private key for user to get data from the server */
  token: string | null;
  avatarUrl: string | null;
  /** Access level of the user: 1 is student, 2 is teacher */
  accessLevel: number | null;
  fullname: string | null;
  signinUser: (userInfo: any) => void;
  signoutUser: () => void;
}

export default AppContext;
