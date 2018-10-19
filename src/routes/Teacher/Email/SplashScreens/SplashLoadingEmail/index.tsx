import { Icon, Spin } from "antd";
import React from "react";
import "./index.css"

const Loading = ({ tipText }: { tipText: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    }}
  >
    <Spin
      tip={tipText}
      style={{width: "auto", height: "auto"}}
      indicator={<Icon type="loading" style={{ fontSize: 50 }} spin={true} />}
    />
  </div>
);

export default Loading;
