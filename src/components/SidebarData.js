import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Вот тут отдельно подгружаются иконки. И да это параша мне тоже не нравится
import { 
    faFile, faPen, 
    faAtom, faGraduationCap, faBrush, faMedal, faGuitar, 
    faAddressBook, faList, faFileLines
} from '@fortawesome/free-solid-svg-icons';

// РАБОТА СО СПИСКАМИ
export const SidebarlistWork = [
    {
        title: 'ЗАГРУЗИТЬ СПИСКИ',
        path: '/listload',
        icon: <FontAwesomeIcon icon={faFile} />,
        cName: 'nav-text'
    },
    {
        title: 'НАСТРОЙКА РЕЙТИНГА',
        path: '/settings',
        icon: <FontAwesomeIcon icon={faPen} />,
        cName: 'nav-text'
    }
]

// СПИСКИ ПО НАПРАВЛЕНИЯМ
export const SidebarRaitingList = [
    {
        title: 'НАУЧНАЯ',
        path: '/nid',
        icon: <FontAwesomeIcon icon={faAtom} />,
        cName: 'nav-text'
    },
    {
        title: 'УЧЕБНАЯ',
        path: '/ud',
        icon: <FontAwesomeIcon icon={faGraduationCap} />,
        cName: 'nav-text'
    },
    {
        title: 'ОБЩЕСТВЕННАЯ',
        path: '/od',
        icon: <FontAwesomeIcon icon={faBrush} />,
        cName: 'nav-text'
    },
    {
        title: 'СПОРТИВНАЯ',
        path: '/sd',
        icon: <FontAwesomeIcon icon={faMedal} />,
        cName: 'nav-text'
    },
    {
        title: 'КУЛЬТУРНО-ТВОРЧЕСКАЯ',
        path: '/ktd',
        icon: <FontAwesomeIcon icon={faGuitar} />,
        cName: 'nav-text'
    }
]

// ОТЧЕТЫ
export const SidebarReports = [
    {
        title: 'СВОДКА',
        path: '/summary',
        icon: <FontAwesomeIcon icon={faAddressBook} />,
        cName: 'nav-text'
    },
    {
        title: 'ПОДАВШИЕ В НЕСКОЛЬКО НАПРАВЛЕНИЙ',
        path: '/severalDirectionsList',
        icon: <FontAwesomeIcon icon={faList} />,
        cName: 'nav-text'
    },
    {
        title: 'ИТОГОВЫЙ СПИСОК',
        path: '/finalList',
        icon: <FontAwesomeIcon icon={faFileLines} />,
        cName: 'nav-text'
    }
]