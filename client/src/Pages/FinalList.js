import React, { useState, useEffect } from "react";
import axios from "axios";
import FinalTable from "../components/tables/FinalTable";

function FinalList() {
  document.title = "Итоговый список";
  const [items, setItems] = useState([]);


  //Гет запрос на список
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/finalList")
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  //обработка кнопки
  const onSubmit = async (e) => {
    e.preventDefault();

    //сам пост запрос
    const response = await fetch("http://localhost:8080/api/finalListFile");
    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Рейтинг";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div>
      <h1 className="header">Итоговый список</h1>
      <FinalTable data={items} itemsPerPage={10} />

      {/* Ниже форма с кнопкой которая делает запрос */}
      <form method="get" action="#" id="#" onSubmit={onSubmit}>
        <div className="row d-flex justify-content-end">
          <button class="btn btn-primary col-2 m-4">Скачать список</button>
        </div>
      </form>
    </div>
  );
}

export default FinalList;
