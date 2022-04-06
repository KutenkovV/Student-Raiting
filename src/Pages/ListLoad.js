import React, { useState } from "react";
import NIDlist from "../Data/NIDlist.json"; //подгружаю данные из json файла в таблицу
import LoadTable from "../components/LoadTable";
import Dropdown from "../components/Dropdown";
import "./ListLoad.css";

function ListLoad() {
  document.title = "Загрузка списков";
  const [data] = useState(NIDlist);
  const [selected, setSelected] = useState("ЗАГРУЗКА СПИСКОВ");
  return (
    <div>
      <div class="row align-items-start">
        <Dropdown selected={selected} setSelected={setSelected}/>
      </div>
      <div class="row align-items-start mt-2 me-0 ">
        <div class="mb-3 col-6">
          <input class="form-control" type="file" id="formFile" />
        </div>
        <button type="button" class="btn btn-primary col-1">
          Загрузить
        </button>
      </div>
      {/* Передаю данные как параметр в компонент */}
      <LoadTable data={data} itemsPerPage={15} />
    </div>
  );
}

export default ListLoad;
