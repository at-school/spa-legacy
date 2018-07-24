export const teacherGetClasses = async (token: string) => {
  const response = await fetch(
    "http://127.0.0.1:5000/classroom/teacher/getclass",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token })
    }
  );

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

interface ITeacherAddClassInfo {
  className: string;
  classDescription: string;
  classLine: string;
  classFalcuty: string;
  classImageData: string | undefined;
}

export const teacherAddClass = async (
  classInfo: ITeacherAddClassInfo,
  token: string
) => {
  const response = await fetch("http://127.0.0.1:5000/classroom/createclass", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...classInfo, token })
  });
  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export const teacherRemoveClass = async (id: string, token:string) => {
  const response = await fetch("http://127.0.0.1:5000/classroom/teacher/removeclass", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id, token })
  });
  if (response.ok) {
    return;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
}
