import React, { useState, useEffect } from "react";
import axios from "../http/api";
import FinalTable from "../components/tables/FinalTable";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

function FinalList() {
  document.title = "Итоговый список";
  const [items, setItems] = useState([]);
  const [distributed, setDistributed] = useState(false);
  const { promiseInProgress } = usePromiseTracker();

  //Гет запрос на список
  useEffect(() => {
    //Запрос на финальный список
    trackPromise(axios.get("/api/finalList"))
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    //Запрос на проверку все ли студенты распределены
    trackPromise(axios.get("/api/getTheFinalFileIsReady"))
      .then((response) => setDistributed(response.data))
      .catch((error) => console.log(error));
    console.log(distributed);
  }, []);

  //обработка кнопки
  const onSubmit = async (e) => {
    e.preventDefault();

    //сам пост запрос
    const response = await fetch("/api/finalListFile");
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
      {promiseInProgress ? (
        <div
          class="spinner-border spinner-border-sm load_spinner"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <FinalTable data={items} itemsPerPage={10} />
      )}

      {/* Ниже форма с кнопкой которая делает запрос */}
      <form method="get" action="#" id="#" onSubmit={onSubmit}>
        <div className="row d-flex justify-content-end">
          {promiseInProgress ? (
            <p></p>
          ) : distributed ? (
            <button class="btn btn-primary col-2 m-4">Скачать список</button>
          ) : (
            <div class="alert alert-danger" role="alert">
              Распределите всех студентов!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default FinalList;
