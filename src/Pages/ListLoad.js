import React, { useState } from "react";
import NIDlist from "../Data/NIDlist.json"; //подгружаю данные из json файла в таблицу
import LoadTable from "../components/LoadTable";
import "./ListLoad.css";

function ListLoad() {
  document.title = "Загрузка списков";
  const [data] = useState(NIDlist);

  return (
    <div>
      <h1>Загрузка списков</h1>
      <div class="row align-items-start mt-4">
        <div class="mb-3 col-10">
          <input class="form-control" type="file" id="formFile" />
        </div>
        <button type="button" class="btn btn-primary col">
          Загрузить
        </button>
      </div>
      {/* Передаю данные как параметр в компонент */}
      <LoadTable data={data} itemsPerPage={15} />
    </div>
  );
}

export default ListLoad;
