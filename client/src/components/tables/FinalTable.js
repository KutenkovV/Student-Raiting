import React from 'react'
import "../LoadTable/LoadTable.css"
import usePagination from "../../hooks/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
    faEllipsis,
  } from "@fortawesome/free-solid-svg-icons";

const FinalTable = ({ data, itemsPerPage, startFrom }) => {
    const { slicedData, pagination, prevPage, nextPage, changePage } =
        usePagination({ itemsPerPage, data, startFrom });

    return (
        <>
            <table className='tableFinal'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Баллы</th>
                        <th>Направление</th>
                        <th>Фио</th>
                        <th>Группа</th>
                        <th>Институт</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((item) => (
                        <tr key={item.id} className="loadTr">
                            <td>{item.student.studnumber}</td>
                            <td>{item.rating.points}</td>
                            <td>{item.rating.ratingcourse.course.title}</td>
                            <td>{item.student.fullname}</td>
                            <td>{item.student.educationgroup}</td>
                            <td>{item.student.institute}</td>
                            <td>{item.cause}</td>
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
    )
}
export default FinalTable