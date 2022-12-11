import { Link, useLocation } from "react-router-dom";
import {
  SidebarlistWork,
  SidebarRaitingList,
  SidebarReports,
} from "../SidebarData";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faEdit,
  faList,
  faIdCard, faCopy,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ active }) {
  //обернул в {}
  const location = useLocation();
  const isActive = location.pathname;

  return (
    <div className={active ? "mainMenu active-menu" : "mainMenu"}>
      <ul className="nav-menu-items">
        <li className="nav-text" id={isActive == "/" ? "active" : ""}>
          <Link to="/">
            <span className="icon"><FontAwesomeIcon icon={faTasks} size="2x" /></span>
            <span className="item">ГЛАВНАЯ</span>
          </Link>
        </li>
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
                <span className="icon">{item.icon}</span>
                <span className="item">{item.title}</span>
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
                <span className="icon">{item.icon}</span>
                <span className="item">{item.title}</span>
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
                <span className="icon">{item.icon}</span>
                <span className="item">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
