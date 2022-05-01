import React, { useState, useEffect } from "react";
import LoadTable from "../components/LoadTable/LoadTable";
import Dropdown from "../components/Dropdown/Dropdown";
import axios from "axios";

function ListLoad() {
  document.title = "Загрузка списков";

  const [selected, setSelected] = useState("ЗАГРУЗКА СПИСКОВ");
  const [items, setItems] = useState([]);

  //Гет запроса на список
  useEffect(() => {
      axios.get('http://localhost:8080/api/listLoad/nid')
          .then(response => setItems(response.data))
          .catch(error => console.log(error));
  }, []);

  console.log(items);


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
      .then((e) => {
        console.log("Success!");
      })
      .catch((e) => {
        console.error('Error!', e);
      })

    console.log(file);
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
      <LoadTable data={items} itemsPerPage={15} />
    </div>
  );
}

export default ListLoad;
