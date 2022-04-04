import React, { useState } from "react";
import NIDlist from "../Data/NIDlist.json"; //подгружаю данные из json файла в таблицу
import LoadTable from "../components/LoadTable";
import "./ListLoad.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function ListLoad() {
  document.title = "Загрузка списков";
  const [data] = useState(NIDlist);

  return (
    <div>
      <div class="row align-items-start">
        <h1 class="header col-3">
          Загрузка списков <FontAwesomeIcon icon={faAngleDown} />
        </h1>
      </div>
      <div class="row align-items-start mt-4 me-0">
        <div class="mb-3 col-6">
          <input class="form-control" type="file" id="formFile" />
        </div>
        <button type="button" class="btn btn-primary col-2">
          Загрузить
        </button>
      </div>
      {/* Передаю данные как параметр в компонент */}
      <LoadTable data={data} itemsPerPage={15} />
    </div>
  );
}

export default ListLoad;
