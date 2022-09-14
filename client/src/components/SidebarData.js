import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Вот тут отдельно подгружаются иконки. И да это параша мне тоже не нравится
import {
  faTasks,
  faEdit,
  faList,
  faIdCard, faCopy,
} from "@fortawesome/free-solid-svg-icons";

// РАБОТА СО СПИСКАМИ active
export const SidebarlistWork = [
  {
    title: "ЗАГРУЗИТЬ СПИСКИ",
    path: "/listload",
    icon: <FontAwesomeIcon icon={faTasks} size="2x" />,
    cName: "nav-text",
  },
  {
    title: "ВАКАНСИИ",
    path: "/settings",
    icon: <FontAwesomeIcon icon={faEdit} size="2x" />,
    cName: "nav-text",
  },
];

// СПИСКИ ПО НАПРАВЛЕНИЯМ
export const SidebarRaitingList = [
  {
    title: "НАУЧНАЯ",
    path: "/nid",
    icon: <FontAwesomeIcon icon={faList} size="2x" />,
    cName: "nav-text",
  },
  {
    title: "УЧЕБНАЯ",
    path: "/ud",
    icon: <FontAwesomeIcon icon={faList} size="2x" />,
    cName: "nav-text",
  },
  {
    title: "ОБЩЕСТВЕННАЯ",
    path: "/od",
    icon: <FontAwesomeIcon icon={faList} size="2x" />,
    cName: "nav-text",
  },
  {
    title: "СПОРТИВНАЯ",
    path: "/sd",
    icon: <FontAwesomeIcon icon={faList} size="2x" />,
    cName: "nav-text",
  },
  {
    title: "КУЛЬТУРНО-ТВОРЧЕСКАЯ",
    path: "/ktd",
    icon: <FontAwesomeIcon icon={faList} size="2x" />,
    cName: "nav-text",
  },
];

// ОТЧЕТЫ
export const SidebarReports = [
  {
    title: "СВОДКА",
    path: "/summary",
    icon: <FontAwesomeIcon icon={faIdCard} size="2x" />,
    cName: "nav-text",
  },
  {
    title: "ПОДАВШИЕ НА НЕСКОЛЬКО НАПРАВЛЕНИЙ",
    path: "/severalDirectionsList",
    icon: <FontAwesomeIcon icon={faList} size="2x" />,
    cName: "nav-text",
  },
  {
    title: "ИТОГОВЫЙ СПИСОК",
    path: "/finalList",
    icon: <FontAwesomeIcon icon={faCopy} size="2x" />,
    cName: "nav-text",
  },
];
