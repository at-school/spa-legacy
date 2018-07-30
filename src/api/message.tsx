export const getAllMessages = async (token: string) => {
  const response = await fetch("http://127.0.0.1:5000/messages/getmessageall", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const getRooms = async (token: string) => {
  const response = await fetch("http://127.0.0.1:5000/message/getrooms", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const createRoom = async (token: string, otherId: string) => {
  const response = await fetch("http://127.0.0.1:5000/message/createroom", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, otherId })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const searchUsers = async (searchPattern: string, token: string) => {
  const response = await fetch("http://127.0.0.1:5000/message/search/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, searchPattern })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
