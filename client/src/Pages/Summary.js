import React, { useState, useEffect} from "react";
import SummaryTable from "../components/tables/SummaryTable";
import axios from "axios";

function Summary() {
  document.title = "Сводка";

  const [items, setItems] = useState([]);

  //Гет запроса на список
  useEffect(() => {
    axios.get('http://localhost:8080/api/report')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1 className="header">Сводка</h1>
      </div>
      <SummaryTable data={items} itemsPerPage={10}  />
    </>
  );
}

export default Summary;
