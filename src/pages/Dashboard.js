import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopMenu from "../components/TopMenu";

function Dashboard() {
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const [topMenuItems, setTopMenuItems] = useState([]);

  useEffect(() => {
    setSideMenuItems([
      { id: 1, name: "📊 대시보드", link: "/dashboard", children: [] },
      { id: 2, name: "👥 사용자 관리", link: "/users", children: [
          { id: 21, name: "🔹 사용자 목록", link: "/users/list" },
          { id: 22, name: "🔹 권한 설정", link: "/users/roles" }
        ] 
      },
      { id: 3, name: "⚙ 설정", link: "/settings", children: [
          { id: 31, name: "🔹 시스템 설정", link: "/settings/system" },
          { id: 32, name: "🔹 계정 관리", link: "/settings/account" }
        ] 
      },
    ]);

    setTopMenuItems([
      { id: 1, name: "🔍 검색", link: "/search" },
      { id: 2, name: "👤 프로필", link: "/profile" },
      { id: 3, name: "⚙ 설정", link: "/settings" },
    ]);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar menuItems={sideMenuItems} />
      <div style={{ flex: 1, padding: "20px" }}>
        <TopMenu menuItems={topMenuItems} />
        <main>
          <Routes>
            {sideMenuItems.map(item => (
              <Route key={item.id} path={item.link} element={<DynamicPage title={item.name} />} />
            ))}
            {sideMenuItems.flatMap(item => item.children).map(child => (
              <Route key={child.id} path={child.link} element={<DynamicPage title={child.name} />} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DynamicPage({ title }) {
  return <h1>{title} 페이지입니다.</h1>;
}

export default Dashboard;