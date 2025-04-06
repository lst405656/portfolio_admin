import { useState } from "react";
import "../styles/Sidebar.css";

function SidebarItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  // `children`이 없으면 빈 배열을 기본값으로 설정
  const children = item.children || [];

  return (
    <li>
      <a href={item.link} onClick={(e) => children.length > 0 && e.preventDefault()}>
        {item.name}
      </a>
      {children.length > 0 && (
        <>
          <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
            {isOpen ? "🔽" : "▶"}
          </button>
          <ul className={`submenu ${isOpen ? "open" : "closed"}`}>
            {children.map((child) => (
              <SidebarItem key={child.id} item={child} />
            ))}
          </ul>
        </>
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