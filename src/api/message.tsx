export const searchUsers = async (searchPattern: string, token: string) => {
  const response = await fetch("http://127.0.0.1:5000/user/search", {
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
