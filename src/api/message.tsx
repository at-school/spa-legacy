export const searchUsers = async (searchPattern: string, token: string) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "user/search", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ searchPattern })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
