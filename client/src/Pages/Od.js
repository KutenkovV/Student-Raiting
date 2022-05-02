import React, { useState, useEffect } from "react";
import axios from "axios";
import DirectionsTable from "../components/tables/DirectionsTable";

function Od() {
  document.title = "Общественная";
  const [items, setItems] = useState([]);

  
  //Гет запроса на список
  useEffect(() => {
    axios.get('http://localhost:8080/api/listLoad/od')
        .then(response => setItems(response.data))
        .catch(error => console.log(error));
}, []);

  return (
    <div>
      <h1 className="header">Общественная деятельность</h1>
      <DirectionsTable data={items} itemsPerPage={18} />
    </div>
  );
}

export default Od;
