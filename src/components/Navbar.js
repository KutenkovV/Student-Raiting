import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarlistWork, SidebarRaitingList, SidebarReports } from './SidebarData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCake } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FontAwesomeIcon onClick={showSidebar} icon="fa-solid fa-file-arrow-up" />
                </Link>
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>

                    {/* блять я заебался */}
                    {/* ЗАГРУЗКА СПИСКОВ */}
                    <b>РАБОТА СО СПИСКАМИ</b>
                    {SidebarlistWork.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
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
                                    {item.icon}
                                    <span>{item.title}</span>
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
                                    {item.icon}
                                    <span>{item.title}</span>
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