import React, { useState, useEffect } from "react";
import SummaryTable from "../components/tables/SummaryTable";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from "../http/api";

function Summary() {
  document.title = "Сводка";

  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  //Гет запрос на список "Сводка"
  useEffect(() => {
    trackPromise(axios.get('api/report'))
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1 className="header">Сводка</h1>

        {/* блокс с промисом "загрузка..." */}
        {promiseInProgress
          ? <div class="spinner-border spinner-border-sm load_spinner" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> : <SummaryTable data={items} itemsPerPage={10} />
        }
      </div>
    </>
  );
}

export default Summary;
