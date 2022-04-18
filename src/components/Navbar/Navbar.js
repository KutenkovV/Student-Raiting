import { Link, useLocation } from "react-router-dom";
import {
  SidebarlistWork,
  SidebarRaitingList,
  SidebarReports,
} from "../SidebarData";
import "./Navbar.css";

function Navbar({active}) { //обернул в {}
  const location = useLocation();
  const isActive = location.pathname;

  return (
    <div className={active ? "mainMenu active" : "mainMenu"}>
      <ul className="nav-menu-items">
        {/* ЗАГРУЗКА СПИСКОВ */}
        <p>Работа со списками</p>
        {SidebarlistWork.map((item, index) => {
          return (
            <li
              key={index}
              className={item.cName}
              // здесь задаем айдишник с нужным классом если путь айтема равен текущему
              id={isActive == item.path ? "active" : ""}
            >
              <Link to={item.path}>
                <span class="icon">{item.icon}</span>
                <span class="item">{item.title}</span>
              </Link>
            </li>
          );
        })}

        {/* РЕЙТИНГОВЫЕ СПИСКИ */}
        <p>Списки по направлениям</p>
        {SidebarRaitingList.map((item, index) => {
          return (
            <li
              key={index}
              className={item.cName}
              id={isActive == item.path ? "active" : ""}
            >
              <Link to={item.path}>
                <span class="icon">{item.icon}</span>
                <span class="item">{item.title}</span>
              </Link>
            </li>
          );
        })}

        {/* ОТЧЕТ ИЛИ ИТОГОВЫЕ СПИСКИ */}
        <p>Отчеты</p>
        {SidebarReports.map((item, index) => {
          return (
            <li
              key={index}
              className={item.cName}
              id={isActive == item.path ? "active" : ""}
            >
              <Link to={item.path}>
                <span class="icon">{item.icon}</span>
                <span class="item">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
