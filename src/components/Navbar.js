import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarlistWork, SidebarRaitingList, SidebarReports } from './SidebarData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navbar.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            {/* это блок с гамбургером. Ну у нас сайдбар, а он работает типа как дроп лист
            тыкнули и выскочило, пока оставлю это здесь 
            я вообще пишу комментарии по приколу */}
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FontAwesomeIcon onClick={showSidebar} icon="fa-solid fa-file-arrow-up" />
                </Link>
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>

                    {/* ЗАГРУЗКА СПИСКОВ */}
                    <b>РАБОТА СО СПИСКАМИ</b>
                    {SidebarlistWork.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <div className='span-item'>
                                        <span class="icon">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}

                    {/* РЕЙТИНГОВЫЕ СПИСКИ */}
                    <b>СПИСКИ ПО НАПРАВЛЕНИЯМ</b>
                    {SidebarRaitingList.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <div className='span-item'>
                                        <span class="icon">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}

                    {/* ОТЧЕТ ИЛИ ИТОГОВЫЕ СПИСКИ */}
                    <b>ОТЧЕТЫ</b>
                    {SidebarReports.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <div className='span-item'>
                                        <span class="icon">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar