import React, { useState, useEffect } from "react";
import LoadTable from "../components/LoadTable/LoadTable";
import Dropdown from "../components/Dropdown/Dropdown";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from "axios";

function ListLoad() {
  document.title = "Загрузка списков";

  const [selected, setSelected] = useState("ЗАГРУЗКА СПИСКОВ");
  const { promiseInProgress } = usePromiseTracker();
  const [items, setItems] = useState([]);

  useEffect(() => {
    var url;
    if (selected === "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ") { url = "nid" }
    else if (selected === "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ") { url = "ud" }
    else if (selected === "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ") { url = "od" }
    else if (selected === "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ") { url = "sd" }
    else if (selected === "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ") { url = "ktd" }
    else if (selected === "СПИСОК ГАС") { url = "sad" }

    trackPromise(axios.get(`http://localhost:8080/api/listLoad/${url}`))
      .then(response => setItems(response.data))
      .catch(error => console.error(error));

    console.log(url);
    console.log(items);
  }, [selected]);

  ////////////////// Загрузка списков
  const [file, setFile] = useState();
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  //обработка нажатия
  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData();
    data.append('file', file);

    //сам пост запрос
    axios.post('http://localhost:8080/api/listLoad/all', data)
      .then(() => {
        console.log("Success!");
      })
      .catch((e) => {
        console.error('Error!', e);
      })
  };
  //////////////////////////////////

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
      {promiseInProgress
        ? <div>Загрузка...</div> : <LoadTable data={items} itemsPerPage={15} />}
    </div>
  );
}

export default ListLoad;
