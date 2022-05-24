import React, { useState } from "react";
import "../LoadTable/LoadTable.css";
import usePagination from "../../hooks/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

import "./NidTable.css";
const NidTable = ({ data, itemsPerPage, startFrom }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ data, itemsPerPage, startFrom });

  return (
    <>
      <table className="NidTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Баллы</th>
            <th>Уровень</th>
            <th>ФИО</th>
            <th>Институт</th>
            <th>Группа</th>
            <th>Причина</th>
            <th>ГАС</th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id} className={item.destination ? "destinationTrue" : "destinationFalse"}>
              <td>{item.id}</td>
              <td>{item.rating.points}</td>
              <td>{item.rating.ratingcourse.courselevel.level}</td>
              <td>{item.student.fullname}</td>
              <td>{item.student.institute}</td>
              <td>{item.student.educationgroup}</td>
              <td>{item.cause}</td>
              <td>{item.student.sad}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* блок с пагинацией */}
      <nav className="pagination nav-pagination mt-3">
        {/* Кнопка "<< Назад" */}
        <li className="page-item">
          <a
            href="#"
            className="page-link"
            aria-label="Previous"
            onClick={prevPage}
          >
            <span aria-hidden="true" className=" arrow">
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
          </a>
        </li>

        {/* Сам лист-пагинация  */}
        <ul className="pagination">
          {pagination.map((page) => {
            if (!page.ellipsis) {
              return (
                <li
                  className={page.current ? "page-item active" : "page-item"}
                  key={page.id}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={(e) => changePage(page.id, e)}
                  >
                    {" "}
                    {page.id}
                  </a>
                </li>
              );
            } else {
              return (
                <li key={page.id} className="page-item mt-3">
                  <span className="pagination-ellipsis">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </span>
                </li>
              );
            }
          })}
        </ul>

        {/* Кнопка "Вперед >>" */}
        <li className="page-item">
          <a
            href="#"
            className="page-link"
            aria-label="Next"
            onClick={nextPage}
          >
            <span aria-hidden="true" className=" arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </a>
        </li>
      </nav>
    </>
  );
};

export default NidTable;