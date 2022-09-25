import React, { useState, useEffect } from "react";
import "../LoadTable/LoadTable.css";
import usePagination from "../../hooks/usePagination";
import StudentMenu from "../StudentMenu/StudentMenu";

const SeveralDirectionsTable = ({ data, itemsPerPage, startFrom }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ itemsPerPage, data, startFrom });

  const [cellValue, setCellValue] = useState(); // Здесь лежит строка с таблицы которую мы хотим "Определить"
  const [directions, setDirections] = useState([]); // Здесь храним массив направлений по которым нужно определить студента

  // Функция, которая получает строку
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
              <td onClick={() => {
                getCellValue(item.studnumber)
                setDirections([]); //чистим массив перед тем как тыкнуть, чтобы данные не накапливались
                //Ниже проверяем по каким направлениям есть стипуха и то добавляем в массив 
                if(item.nid.destination === true) {setDirections(Array => [...Array, "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ"])}
                if(item.ud.destination === true) {setDirections(Array => [...Array, "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ"])}
                if(item.sd.destination === true) {setDirections(Array => [...Array, "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ"])}
                if(item.od.destination === true) {setDirections(Array => [...Array, "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ"])}
                if(item.ktd.destination === true) {setDirections(Array => [...Array, "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ"])}
              }}>
                <StudentMenu stNum={cellValue} StudentDirections={directions} items={slicedData} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SeveralDirectionsTable;
