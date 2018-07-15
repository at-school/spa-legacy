import { Card } from "antd";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
const data = [{ name: "Group A", value: 80 }, { name: "Group B", value: 21 }];
const COLORS = ["rgb(24, 144, 255)", "rgb(250, 250, 250)"];

export default class StudentOnTimeCard extends React.Component {
  public render() {
    return (
      <Card title="Student On Time">
        <div style={{ width: "100%" }}>
          <ResponsiveContainer height={200} width="100%">
            <PieChart>
              <Pie
                dataKey={"value"}
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius={70}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={-1}
              >
                {data.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ textAlign: "center", marginTop: "-130px" }}>
          <p style={{marginBottom: "0px"}}>80%</p>
          <p>On Time</p>
        </div>
      </Card>
    );
  }
}
