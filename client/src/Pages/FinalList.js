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
  }, []);

  //обработка кнопки
  const onSubmit = async (e) => {
    e.preventDefault();

    //сам пост запрос
    const response = await axios.get("/api/finalListFile", {
      responseType: "blob",
    });
    if (response.status === 200) {
      const downloadUrl = window.URL.createObjectURL(response.data);
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

      {/* Ниже форма с кнопкой которая делает запрос */}
      <form method="get" onSubmit={onSubmit}>
        <div className="d-flex text-center justify-content-start">
          {promiseInProgress ? (
            <p></p>
          ) : distributed ? (
            <button className="btn btn-primary col-auto mt-2">
              Скачать список
            </button>
          ) : (
            <div className="alert alert-danger col-auto mt-3" role="alert">
              Распределите всех студентов!
            </div>
          )}
        </div>
      </form>

      {promiseInProgress ? (
        <div
          className="spinner-border spinner-border-sm load_spinner"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <FinalTable data={items} itemsPerPage={10} />
      )}
    </div>
  );
}

export default FinalList;
