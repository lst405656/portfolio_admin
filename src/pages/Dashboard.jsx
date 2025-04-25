import React from "react";
import ProjectList from "../components/ProjectList";
import Stats from "../components/Stats";
import ContentUpdate from "../components/ContentUpdate";
import Feedback from "../components/Feedback";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>📊 관리자 대시보드</h1>
      <div className="container">
        <ProjectList />
        <Stats />
        <Feedback />
        <ContentUpdate />
      </div>
    </div>
  );
}

export default Dashboard;