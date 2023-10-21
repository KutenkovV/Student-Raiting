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
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import useToken from "../../hooks/useToken";

function Navbar({ active }) {
  const { token, signOut } = useToken(); // Хук для работы с токеном

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
        <button className="btn btn-secondary m-4 " onClick={() => signOut()}>
        Выход <span className="mx-1"><FontAwesomeIcon icon={faSignOut} size="1x" /></span>
      </button>
      </ul>
    </div>
  );
}

export default Navbar;
