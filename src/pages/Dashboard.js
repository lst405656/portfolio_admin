import React from "react";
import ProjectList from "../components/ProjectList";
import Stats from "../components/Status";
import ContentUpdate from "../components/ContentUpdate";
import Feedback from "../components/Feedback";

function Dashboard() {
  return (
    <div style={{ backgroundColor: "white", padding: "20px" }}>
      <h1>📊 관리자 대시보드</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <ProjectList />
        <Stats />
        <Feedback />
        <ContentUpdate />
      </div>
    </div>
  );
}

export default Dashboard;