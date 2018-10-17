import { Card } from "antd";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
const COLORS = ["rgb(24, 144, 255)", "rgb(250, 250, 250)"];
import { withClassroomContext } from "../../../../../contexts/Teacher/ClassroomContext";

class StudentOnTimeCard extends React.Component<{ classroomContext: any }> {
  public render() {
    const { students } = this.props.classroomContext;
    let percentageOnTime = 100;
    if (students) {
      const totalStudents = students.length;
      let onTimeStudents = 0;
      students.forEach((student: any) => {
        if (!student.inClass) {
          onTimeStudents++;
        } else if (student.minsLate <= 0) {
          onTimeStudents++;
        }
      });
      percentageOnTime = (onTimeStudents / totalStudents) * 100;
    }
    const data = [
      { name: "Group A", value: percentageOnTime },
      { name: "Group B", value: 100 - percentageOnTime }
    ];

    return (
      <Card
        className="student-ontime-card"
        bordered={false}
        title="Student On Time"
      >
        <div style={{ width: "100%" }}>
          <ResponsiveContainer height={200} width="100%">
            <PieChart>
              <Pie
                dataKey={"value"}
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={-1}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index.toString()}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ textAlign: "center", marginTop: "-130px" }}>
          <p style={{ marginBottom: "0px" }}>{percentageOnTime}%</p>
          <p>On Time</p>
        </div>
      </Card>
    );
  }
}

export default withClassroomContext(StudentOnTimeCard);
