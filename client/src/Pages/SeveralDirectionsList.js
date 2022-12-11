import React, { useState, useEffect } from "react";
import SeveralDirectionsTable from "../components/tables/SeveralDirectionsTable";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import axios from "../http/api";

function SeveralDirectionsList() {
  document.title = "Несколько направлений";

  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker(); //промис который отвечает за "Загрузка..."

  const [selected, setSelected] = useState("");

  //Реализация callback'a
  const handlSelectedChange = (selected) => {
    setSelected(selected);
  };

  //Гет запрос на список "Несколько направлений"
  useEffect(() => {
    trackPromise(axios.get("/api/studentRatingManyCourses"))
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, [selected]); //Ставим зависимость обновлять данные по изменению значений в Selected

  return (
    <div>
      <h1 className="header">Подавшие на несколько направлений</h1>

      {promiseInProgress ? (
        <div
          className="mt-4 spinner-border spinner-border-sm load_spinner"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <SeveralDirectionsTable
          onChange={handlSelectedChange}
          data={items}
          itemsPerPage={10}
        />
      )}
    </div>
  );
}

export default SeveralDirectionsList;
