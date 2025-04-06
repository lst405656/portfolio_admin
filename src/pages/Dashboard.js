import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopMenu from "../components/TopMenu";

function Dashboard() {
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const [topMenuItems, setTopMenuItems] = useState([]);

  useEffect(() => {
    // ✅ 사이드 메뉴 데이터 설정
    setSideMenuItems([
      {
        id: 1,
        name: "📊 대시보드",
        link: "/dashboard",
        children: []
      },
      {
        id: 2,
        name: "👥 사용자 관리",
        link: "/users",
        children: [
          { id: 21, name: "🔹 사용자 목록", link: "/users/list" },
          { id: 22, name: "🔹 권한 설정", link: "/users/roles" }
        ]
      },
      {
        id: 3,
        name: "⚙ 설정",
        link: "/settings",
        children: [
          { id: 31, name: "🔹 시스템 설정", link: "/settings/system" },
          { id: 32, name: "🔹 계정 관리", link: "/settings/account" }
        ]
      },
      {
        id: 4,
        name: "🚪 로그아웃",
        link: "/logout",
        children: []
      }
    ]);

    // ✅ 상단 메뉴 데이터 설정
    setTopMenuItems([
      { id: 1, name: "🔍 검색", link: "/search" },
      { id: 2, name: "👤 프로필", link: "/profile" },
      { id: 3, name: "⚙ 설정", link: "/settings" }
    ]);
  }, []);

  return (
    <div>
      <TopMenu menuItems={topMenuItems} /> {/* ✅ 상단 메뉴 데이터 전달 */}
      <Sidebar menuItems={sideMenuItems} /> {/* ✅ 사이드 메뉴 데이터 전달 */}
      <h1>📊 대시보드</h1>
    </div>
  );
}

export default Dashboard;