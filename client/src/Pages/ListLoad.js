import React, { useState } from "react";
import NIDlist from "../Data/NIDlist.json"; //подгружаю данные из json файла в таблицу
import LoadTable from "../components/LoadTable/LoadTable";
import Dropdown from "../components/Dropdown/Dropdown";
import axios from "axios";

function ListLoad() {
  document.title = "Загрузка списков";

  const [data] = useState(NIDlist);
  const [selected, setSelected] = useState("ЗАГРУЗКА СПИСКОВ");

  const [file, setFile] = useState();
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData();
    data.append('file', file);

    axios.post('http://localhost:8080/api/listLoad/ud', data)
      .then((e) => {
        console.log("Success!");
      })
      .catch((e) => {
        console.error('Error!', e);
      })

    console.log(file);
  };

  return (
    <div>
      <Dropdown selected={selected} setSelected={setSelected} />
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
        <div class="row align-items-start mt-2 me-0 ">
          <div class="mb-3 col-6">
            <input onChange={onInputChange} class="form-control" type="file" id="formFile" />
          </div>
          <button class="btn btn-primary col-1">
            Загрузить
          </button>
        </div>
      </form>      
      {/* Передаю данные как параметр в компонент */}
      <LoadTable data={data} itemsPerPage={15} />
    </div>
  );
}

export default ListLoad;
