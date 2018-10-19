import Moment from "moment";
import React from "react";
import { withApollo } from "react-apollo";
import Webcam from "react-webcam";
import AppContext from "../../../../../../contexts/AppContext";
import { withClassroomContext } from "../../../../../../contexts/Teacher/ClassroomContext";
import { getScheduleDetailsQuery } from "../../../../queries";
import { getRollMarkingActivitiesQuery } from "../../../queries";

const uploadImage = async (
  imageData: string,
  studentList: any,
  scheduleId: string,
  userId: string,
  token: string,
  startTime: string
) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI + "camera/upload", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      imageData,
      studentList,
      scheduleId,
      userId,
      current: String(Moment()),
      startTime
    })
  });
  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

class Camera extends React.Component<any, any> {
  public state = {
    sendImage: null
  };

  public sendImageInterval: any;

  private webcam: any;

  public setRef = (webcam: any) => {
    this.webcam = webcam;
  };
  public capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    return imageSrc;
  };
  public upload = () => {
    if (this.webcam) {
      const imageSrc = this.webcam.getScreenshot();
      const studentsNotInClass = this.props.classroomContext.students
        .filter((student: any) => !student.inClass)
        .map((student: any) => student.studentDetails.Id);
      if (imageSrc) {
        uploadImage(
          imageSrc,
          studentsNotInClass,
          this.props.classroomContext.scheduleId,
          this.props.userId,
          this.props.token,
          this.props.classroomContext.startTime
        )
          .then(data => {
            const storeData = this.props.client.readQuery({
              query: getScheduleDetailsQuery,
              variables: {
                teacherId: this.props.userId,
                line: this.props.classroomContext.line,
                classId: this.props.classroomContext.classId
              }
            });
            const { scheduleDetails } = storeData;
            if (
              scheduleDetails &&
              scheduleDetails.students &&
              scheduleDetails.students.length > 0
            ) {
              const studentsMarkedList = data.studentList.map((s: any) => s.Id);
              storeData.scheduleDetails.students = storeData.scheduleDetails.students.map(
                (student: any) => {
                  if (studentsMarkedList.includes(student.studentDetails.Id)) {
                    const minsLate = data.studentList.find(
                      (s: any) => s.Id === student.studentDetails.Id
                    ).minsLate;
                    return { ...student, inClass: true, minsLate };
                  }
                  return { ...student };
                }
              );
            }
            this.props.client.writeQuery({
              query: getScheduleDetailsQuery,
              variables: {
                teacherId: this.props.userId,
                line: this.props.classroomContext.line,
                classId: this.props.classroomContext.classId
              },
              data: storeData
            });
            // add new activity
            if (data.activity) {
              const activityStoreData = this.props.client.readQuery({
                query: getRollMarkingActivitiesQuery,
                variables: {
                  userId: this.props.userId
                }
              });
              const { rollMarkingActivites } = activityStoreData;
              console.log(rollMarkingActivites.length)

              if (rollMarkingActivites) {
                rollMarkingActivites.unshift({
                  ...data.activity,
                  __typename: "RollMarkingActivitiesSchema",
                  students: data.studentList.map((s: any) => {
                    const studentData = this.props.classroomContext.students.find(
                      (student: any) => student.studentDetails.Id === s.Id
                    );
                    return {
                      Id: studentData.studentDetails.Id,
                      firstname: studentData.studentDetails.firstname,
                      lastname: studentData.studentDetails.lastname,
                      __typename: "UserSchema"
                    };
                  })
                });
                console.log(rollMarkingActivites.length)
                this.props.client.writeQuery({
                  query: getRollMarkingActivitiesQuery,
                  variables: {
                    userId: this.props.userId
                  },
                  data: activityStoreData
                });
              }
            }
          })
          .catch(err => console.log(err));
      }
    }
  };
  public componentDidMount() {
    this.sendImageInterval = setInterval(this.upload, 500);
  }
  public componentWillUnmount() {
    clearInterval(this.sendImageInterval);
  }
  public render() {
    console.log(this.props.classroomContext);
    return (
      <div style={{ position: "fixed", zIndex: -1, visibility: "hidden" }}>
        <Webcam
          audio={false}
          ref={this.setRef}
          width="100%"
          screenshotFormat="image/jpeg"
        />
      </div>
    );
  }
}

export default withApollo(
  withClassroomContext((props: any) => (
    <AppContext.Consumer>
      {value => (
        <Camera
          userId={value.userId}
          username={value.username}
          {...props}
          token={value.token}
        />
      )}
    </AppContext.Consumer>
  ))
);
