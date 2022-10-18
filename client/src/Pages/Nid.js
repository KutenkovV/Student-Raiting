import React, { useState, useEffect } from "react";
import axios from "../http/api";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import NidTable from "../components/tables/NidTable";
import ColorMap from "../components/ColorMap";

function Nid() {
  document.title = "Научная";
  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  //Гет запрос на список "Научная деятельность"
  useEffect(() => {
    trackPromise(axios.get("/api/nid"))
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="header">Научная деятельность</h1>
      <ColorMap />

      {/* блокс с промисом "загрузка..." */}
      {promiseInProgress ? (
        <div
          class="spinner-border spinner-border-sm load_spinner"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <NidTable data={items} itemsPerPage={10} />
      )}
    </div>
  );
}

export default Nid;
