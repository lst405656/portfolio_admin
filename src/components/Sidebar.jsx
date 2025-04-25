import { useState } from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function SidebarItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const children = item.children || [];

  const hasChildren = children.length > 0;

  return (
    <li>
      {hasChildren ? (
        // 자식이 있으면 페이지 이동 안 하고 토글만
        <span onClick={() => setIsOpen(!isOpen)} className="menu-link with-children">
          {item.name} <span className="toggle-icon">{isOpen ? "🔽" : "▶"}</span>
        </span>
      ) : (
        // 자식이 없으면 Link 사용해서 라우터 이동
        // <Link to={item.link} className="menu-link">
        //   {item.name}
        // </Link>
        <NavLink to={item.link} className={({ isActive }) => isActive ? "active" : ""}>
          {item.name}
        </NavLink>
        
      )}

      {hasChildren && (
        <ul className={`submenu ${isOpen ? "open" : "closed"}`}>
          {children.map((child) => (
            <SidebarItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Sidebar({ menuItems }) {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
