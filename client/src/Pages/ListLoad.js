import React, { useState, useEffect } from "react";
import "./ListLoad.css"
import LoadTable from "../components/LoadTable/LoadTable";
import Dropdown from "../components/Dropdown/Dropdown";
import DropFileInput from "../components/DropFileInput/DropFileInput";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from "axios";

function ListLoad() {
  document.title = "Загрузка списков";

  const [selected, setSelected] = useState("НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ");
  const { promiseInProgress } = usePromiseTracker(); //промис который отвечает за "Загрузка..."
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    var url;
    if (selected === "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ") { url = "nid" }
    else if (selected === "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ") { url = "ud" }
    else if (selected === "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ") { url = "od" }
    else if (selected === "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ") { url = "sd" }
    else if (selected === "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ") { url = "ktd" }
    else if (selected === "СПИСОК ГАС") { url = "sad" }
    else if (selected === "СВОБОДНЫЙ ГРАФИК") { url = "free" }
    else if (selected === "КАНИКУЛЫ") { url = "vacation" }

    await trackPromise(axios.get(`http://localhost:8080/api/listLoad/${url}`))
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchData();
    //document.getElementById("formFile").value = "";
  }, [selected]);

  ////////////////// Загрузка списков
  const [file, setFile] = useState();

  const onFileChange = (files) => {
    console.log(files);
  }

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  //обработка нажатия
  const onSubmit = async (e) => {
    //Тут условия пост запросов
    var url;
    if (selected === "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ"
      || selected === "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ"
      || selected === "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ"
      || selected === "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ"
      || selected === "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ") { url = "all" }
    else if (selected === "СПИСОК ГАС") { url = "sad" }
    else if (selected === "СВОБОДНЫЙ ГРАФИК") { url = "free" }
    else if (selected === "КАНИКУЛЫ") { url = "vacation" }

    e.preventDefault()

    const data = new FormData();
    data.append('file', file);
    console.log(data);

    //сам пост запрос
    await axios.post(`http://localhost:8080/api/listLoad/${url}`, data)
      .then(() => {
        console.log("Success!");
      })
      .catch((e) => {
        console.error('Error!', e);
      })

    document.getElementById("formFile").value = ""; // Чистим выбранный файл после загрузки
    fetchData(); // Ещё раз делаем запрос
    setItems([...items]); // И ещё раз (это не обязательно) загружаем файлы в стейт
  };

  return (
    <>
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
        <DropFileInput onChange={onInputChange} onFileChange={(files) => onFileChange(files)} />
        <button class="btn m-2 btn-primary col-1">
          Загрузить
        </button>
      </form>
    </>
  );
}

export default ListLoad;
