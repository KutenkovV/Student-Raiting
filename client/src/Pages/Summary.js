import React, { useState, useEffect } from "react";
import SummaryTable from "../components/tables/SummaryTable";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from "axios";

function Summary() {
  document.title = "Сводка";

  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  //Гет запрос на список "Сводка"
  useEffect(() => {
    trackPromise(axios.get('http://localhost:8080/api/report'))
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1 className="header">Сводка</h1>

        {/* блокс с промисом "загрузка..." */}
        {promiseInProgress
          ? <div>Загрузка...</div> : <SummaryTable data={items} itemsPerPage={10} />
        }
      </div>
    </>
  );
}

export default Summary;
