import React, { useState, useEffect } from "react";
import axios from "../http/index";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import DirectionsTable from "../components/tables/DirectionsTable";

function Ud() {
  document.title = "Учебная";

  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    trackPromise(axios.get('http://localhost:8080/api/ud'))
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1 class="header">Учебная деятельность</h1>
      <div className="row colorMap_container mt-4 mb-4">
        <div className="colorMap colorMap_enoughPoints col">
          <p>
            Получают стипендию
          </p>
        </div>
        <div className="colorMap colorMap_vacation col">
          <p>
            На каникулах
          </p>
        </div>
        <div className="colorMap colorMap_free col">
          <p>
            Свободный график
          </p>
        </div>
      </div>
      {/* блокс с промисом "загрузка..." */}
      {promiseInProgress
        ? <div class="spinner-border spinner-border-sm load_spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> : <DirectionsTable data={items} itemsPerPage={10} />
      }
    </div>
  );
}

export default Ud;
