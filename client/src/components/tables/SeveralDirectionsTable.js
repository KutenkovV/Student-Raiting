import React from "react";
import "../LoadTable/LoadTable.css";
import usePagination from "../../hooks/usePagination";
import StudentMenu from "../StudentMenu/StudentMenu";

const SeveralDirectionsTable = ({ data, itemsPerPage, startFrom }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ itemsPerPage, data, startFrom });

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
            <th>Гас</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id}>
              <td>{item.studnumber}</td>
              <td>{item.fullname}</td>
              <td className={item.nid.destination ? "tdTrue" : "tdFalse"} >{item.nid.point}</td>
              <td className={item.ud.destination ? "tdTrue" : "tdFalse"} >{item.ud.point}</td>
              <td className={item.sd.destination ? "tdTrue" : "tdFalse"}>{item.sd.point}</td>
              <td className={item.od.destination ? "tdTrue" : "tdFalse"}>{item.od.point}</td>
              <td className={item.ktd.destination ? "tdTrue" : "tdFalse"}>{item.ktd.point}</td>
              <td>{item.educationgroup}</td>
              <td>{item.institute}</td>
              <td><StudentMenu /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SeveralDirectionsTable;
