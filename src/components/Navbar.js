import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SidebarlistWork,
  SidebarRaitingList,
  SidebarReports,
} from "./SidebarData";
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
      {/* это блок с гамбургером. Т.к. у нас сайдбар, то по науке он работает как дроп лист
            тыкнули и выскочили все айтемы
            пока оставлю это здесь, нам и так сойдет, т.е. статично */}
      {/* <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FontAwesomeIcon onClick={showSidebar} icon="fa-solid fa-file-arrow-up" />
                </Link>
            </div> */}

      <ul className="nav-menu-items">
        {/* ЗАГРУЗКА СПИСКОВ */}
        <b>РАБОТА СО СПИСКАМИ</b>
        {SidebarlistWork.map((item, index) => {
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

        {/* РЕЙТИНГОВЫЕ СПИСКИ */}
        <br />
        <b>СПИСКИ ПО НАПРАВЛЕНИЯМ</b>
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
        <br />
        <b>ОТЧЕТЫ</b>
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
