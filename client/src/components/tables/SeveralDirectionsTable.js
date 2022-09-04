import React, { useState, useEffect } from "react";
import "../LoadTable/LoadTable.css";
import usePagination from "../../hooks/usePagination";
import StudentMenu from "../StudentMenu/StudentMenu";

const SeveralDirectionsTable = ({ data, itemsPerPage, startFrom }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ itemsPerPage, data, startFrom });

  const [selected, setSelected] = useState();
  const [cellValue, setCellValue] = useState();

  console.log(selected);

  const getCellValue = (cell) => {
    setCellValue(cell);
  }

  if (data.length === 0)
    return <div>Загрузите данные</div> // Сюда по хорошему заглушку какую-нибудь

  return (
    <>
      <table className="tableSeveralDirections">
        <thead>
          <tr>
            <th>Номер студента</th>
            <th>Фио</th>
            <th>Нид</th>
            <th>Уд</th>
            <th>Сд</th>
            <th>Од</th>
            <th>Ктд</th>
            <th>Группа</th>
            <th>Институт</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id} className="loadTr">
              <td>{item.studnumber}</td>
              <td>{item.fullname}</td>
              <td><div className={item.nid.destination ? "tdTrue" : "tdFalse"}>{item.nid.point}</div></td>
              <td><div className={item.ud.destination ? "tdTrue" : "tdFalse"}>{item.ud.point}</div></td>
              <td><div className={item.sd.destination ? "tdTrue" : "tdFalse"}>{item.sd.point}</div></td>
              <td><div className={item.od.destination ? "tdTrue" : "tdFalse"}>{item.od.point}</div></td>
              <td><div className={item.ktd.destination ? "tdTrue" : "tdFalse"}>{item.ktd.point}</div></td>
              <td>{item.educationgroup}</td>
              <td>{item.institute}</td>
              <td onClick={() => getCellValue(item.studnumber)}><StudentMenu stNum={cellValue} items={slicedData} selected={selected} setSelected={setSelected}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SeveralDirectionsTable;
