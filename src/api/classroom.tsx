export const searchStudents = async (searchPattern: string, token: string) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "user/search/student", {
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

export const addStudentsToClass = async (studentList: string[], classId: string, token: string) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "classroom/add/students", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ studentList, classId })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};
