import React from "react";
import "../LoadTable/LoadTable.css";
import usePagination from "../../hooks/usePagination";
import StudentMenu from "../StudentMenu/StudentMenu";

const SeveralDirectionsTable = ({ data, itemsPerPage, startFrom }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ itemsPerPage, data, startFrom });

  return (
    <>
      <table className="tableSeveralDirections">
        <thead>
          <tr>
            <th>Id</th>
            <th>Фио</th>
            <th>Нид</th>
            <th>Уд</th>
            <th>Сд</th>
            <th>Од</th>
            <th>Ктд</th>
            <th>Группа</th>
            <th>Институт</th>
            <th>Гас</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fio}</td>
              <td>{item.nid}</td>
              <td>{item.ud}</td>
              <td>{item.sd}</td>
              <td>{item.od}</td>
              <td>{item.ktd}</td>
              <td>{item.group}</td>
              <td>{item.institute}</td>
              <td>{item.gas}</td>
              <td><StudentMenu/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SeveralDirectionsTable;
