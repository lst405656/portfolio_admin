import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopMenu from "./components/TopMenu";
import "./App.css";

const loadComponent = (componentName) =>
  React.lazy(() => import(`./pages/${componentName}`));

function App() {
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const [topMenuItems, setTopMenuItems] = useState([]);
  const [routes, setRoutes] = useState([]);

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
      { id: 4, name: "포트폴리오", link: "/portfolio/list", children: [] }
    ], []);
  
    setTopMenuItems([
      { id: 1, name: "🔍 검색", link: "/search" },
      { id: 2, name: "👤 프로필", link: "/profile" },
      { id: 3, name: "⚙ 설정", link: "/settings" }
    ], []);

    setRoutes([
      { "path": "/login", "element": "Login" },
      { "path": "/dashboard", "element": "Dashboard" },
      { "path": "/users", "element": "Users" },
      { "path": "/portfolio/list", "element": "Portfolio/List" },
      { "path": "/portfolio/detail", "element": "Portfolio/Detail" },
      { "path": "/portfolio/insert", "element": "Portfolio/Insert" },
      // { "path": "/settings", "element": "SettingsPage" } // 새 페이지 추가
    ], []);
  }, []);

  return (
    <Router>
        <TopMenu menuItems={topMenuItems} />
        <div className="main-container">

          <Sidebar menuItems={sideMenuItems} />
          <main>
          {routes.length > 0 ? (
              <Routes>
                  {routes.map((route, index) => {
                      console.log("Trying to load:", route.element);
                      const Component = loadComponent(route.element);
                      return (
                          <Route
                              key={index}
                              path={route.path}
                              element={
                                  <React.Suspense fallback={<div>Loading...</div>}>
                                      <Component />
                                  </React.Suspense>
                              }
                          />
                      );
                  })}
              </Routes>
          ) : (
              <div>Loading routes...</div>
          )}
          </main>
        </div>
    </Router>
  );
}

export default App;