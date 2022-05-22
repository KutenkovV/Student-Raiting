import React, { useState } from "react";
import usePagination from "../../hooks/usePagination";
import "./LoadTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

const LoadTable = ({ data, startForm }) => {
  const itemsPerPage = 10;
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ data, itemsPerPage, startForm });

  if (data.length === 0) return <div>Выберите и загрузите список</div>

  return (
    <>
      <div className="success">Список загружен!</div>
      <table>
        <thead>
          <tr>
            <th>Номер студента</th>
            <th>Направление</th>
            <th>Баллы</th>
            <th>Уровень</th>
            <th>ФИО</th>
            <th>ГРУППА</th>
            <th>ИНСТИТУТ</th>
            <th>ГАС</th>
            <th>Свободный график</th>
            <th>Каникулы</th>
          </tr>
        </thead>
        <tbody>
          {/* Перебор данных из sliceData */}
          {slicedData.map((item) => (
            <tr key={item.student.studnumber}>
              <td>{item.student.studnumber}</td>
              <td>{item.rating.ratingcourse.course.title}</td>
              <td>{item.rating.points}</td>
              <td>{item.rating.ratingcourse.levelid}</td>
              <td>{item.student.fullname}</td>
              <td>{item.student.educationgroup}</td>
              <td>{item.student.institute}</td>
              <td>{item.student.sad}</td>
              <td>{item.student.free}</td>
              <td>{item.student.vacation}</td>
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

export default LoadTable;
