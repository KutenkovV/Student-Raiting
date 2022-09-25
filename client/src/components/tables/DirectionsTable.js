import React, { useEffect } from "react";
import "../LoadTable/LoadTable.css";
import usePagination from "../../hooks/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

const DirectionsTable = ({ data, itemsPerPage, startFrom }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ itemsPerPage, data, startFrom });

  var countTd = 0;

  if (data.length === 0)
    return <div>Загрузите данные</div> // Сюда по хорошему заглушку какую-нибудь

  return (
    <>
      <table className="DirectionsTable">
        <thead>
          <tr>
            <th>Номер студента</th>
            <th>Баллы</th>
            <th>ФИО</th>
            <th>Институт</th>
            <th>Группа</th>
            <th>Причина</th>
            <th>ГАС</th>
            <th>Каникулы</th>
            <th>Свободный график</th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id} className={studentStatus}>
              <td>{item.student.studnumber}</td>
              <td>{item.rating.points}</td>
              <td>{item.student.fullname}</td>
              <td>{item.student.institute}</td>
              <td>{item.student.educationgroup}</td>
              <td>{item.cause}</td>
              <td>{item.student.sad}</td>
              <td>{item.student.vacation}</td>
              <td>{item.student.free}</td>
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

  function studentStatus() {
    if(item.destination){
        return "destinationTrue"
    } else if (item.student.vacation){
        return "vacationTrue"
    } else if (item.student.free){
        return "freeTrue"
    } else {
        return "loadTr destinationFalse"
    }
  }
};

export default DirectionsTable;