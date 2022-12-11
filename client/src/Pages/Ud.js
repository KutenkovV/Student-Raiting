import React, { useState, useEffect } from "react";
import axios from "../http/api";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import DirectionsTable from "../components/tables/DirectionsTable";
import ColorMap from "../components/ColorMap";

function Ud() {
  document.title = "Учебная";

  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    trackPromise(axios.get("api/ud"))
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="header">Учебная деятельность</h1>
      <ColorMap />

      {/* блокс с промисом "загрузка..." */}
      {promiseInProgress ? (
        <div
          className="mt-4 spinner-border spinner-border-sm load_spinner"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <DirectionsTable data={items} itemsPerPage={10} />
      )}
    </div>
  );
}

export default Ud;
