import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SidebarlistWork,
  SidebarRaitingList,
  SidebarReports,
} from "../SidebarData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <span class="burgerBar">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </span>

      <ul className="nav-menu-items">
        {/* ЗАГРУЗКА СПИСКОВ */}
        <p>Работа со списками</p>
        {SidebarlistWork.map((item, index) => {
          return (
            <li
              key={index}
              className={item.cName}
              // здесь задаем айдишник с нужным классом если путь айтема равен текущему
              id={window.location.pathname == item.path ? "active" : ""}
              // при клике получаем текущий путь
              onClick={() => {
                window.location.pathname = item.path;
              }}
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
              id={window.location.pathname == item.path ? "active" : ""}
              onClick={() => {
                window.location.pathname = item.path;
              }}
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
              id={window.location.pathname == item.path ? "active" : ""}
              onClick={() => {
                window.location.pathname = item.path;
              }}
            >
              <Link to={item.path}>
                <span class="icon">{item.icon}</span>
                <span class="item">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Navbar;
