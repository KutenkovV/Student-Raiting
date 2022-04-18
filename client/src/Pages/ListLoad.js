import React, { useEffect,useState } from "react";
import NIDlist from "../Data/NIDlist.json"; //подгружаю данные из json файла в таблицу
import LoadTable from "../components/LoadTable";
import Dropdown from "../components/Dropdown";
import "./ListLoad.css";

function ListLoad() {
  document.title = "Загрузка списков";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/listLoad/ud")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const [selected, setSelected] = useState("ЗАГРУЗКА СПИСКОВ");
  
  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
  return (
    <div>
      <div class="row mb-3">
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
      <LoadTable data={items} itemsPerPage={15} />
    </div>
  );
}
}

export default ListLoad;
