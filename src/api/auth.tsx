interface IRegisterData {
  email: string;
  username: string;
  password: string;
  password1: string;
  firstname: string;
  lastname: string;
  prefix: string;
  phone: string;
  accessLevel: string;
  agreement: boolean;
  dob: string;
  gender: string;
}

export const register = async (data: IRegisterData) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "auth/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

/**
 *
 * @param username - the username
 * @returns true if username is duplicated or else false
 */
export const checkDuplicateUsername = async (username: string) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "auth/duplicateuser", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username })
  });

  if (response.ok) {
    const data = await response.json();
    return data.duplicate;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

/**
 *
 * @param username the username of the user
 * @param password the password of the user
 *
 * @returns an object contains all user info: refers to the server for more details
 */
export const signin = async (username: string, password: string) => {
  console.log(process.env)
  console.log(process.env.REACT_APP_LOCAL_URI + "auth/signin")
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "auth/signin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

/**
 *
 * @param token access token of the user
 *
 * @returns nothing upon success
 *
 */
export const signout = async (token: string | null) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "auth/signout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token })
  });
  if (response.ok) {
    return;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
