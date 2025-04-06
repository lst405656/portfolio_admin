import "../styles/TopMenu.css";

function TopMenu({ menuItems }) { // ✅ Dashboard에서 menuItems 받아오기
  return (
    <header className="top-menu">
      <h1>관리자 페이지</h1>
      <nav>
        <ul className="top-menu-list">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li key={item.id}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))
          ) : (
            <li>📌 메뉴가 없습니다.</li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default TopMenu;