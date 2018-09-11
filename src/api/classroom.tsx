export const searchStudents = async (searchPattern: string, token: string) => {
  const response = await fetch("http://127.0.0.1:5000/user/search/student", {
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
  const response = await fetch("http://127.0.0.1:5000/classroom/add/students", {
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
