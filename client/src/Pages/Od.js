import React, { useState, useEffect } from "react";
import axios from "../http/api";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import DirectionsTable from "../components/tables/DirectionsTable";
import ColorMap from "../components/ColorMap";

function Od() {
  document.title = "Общественная";

  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  //Гет-запрос на список "Общественная деятельность"
  useEffect(() => {
    trackPromise(axios.get("/api/od"))
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="header">Общественная деятельность</h1>
      <ColorMap />

      {/* блок с промисом "загрузка..." */}
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

export default Od;
