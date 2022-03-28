import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarlistWork, SidebarRaitingList, SidebarReports } from './SidebarData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCake } from '@fortawesome/free-solid-svg-icons';

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
                    <a>РАБОТА СО СПИСКАМИ</a>
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
                    <a>СПИСКИ ПО НАПРАВЛЕНИЯМ</a>
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
                    <a>ОТЧЕТЫ</a>
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