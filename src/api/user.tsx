export const editUserBio = async (
  bio: string,
  userId: string,
  token: string
) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "user/edit/bio", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ bio, userId })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
