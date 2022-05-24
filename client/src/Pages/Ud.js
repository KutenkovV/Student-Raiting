import React, { useState, useEffect } from "react";
import axios from "axios";
import DirectionsTable from "../components/tables/DirectionsTable";

function Ud() {
  document.title = "Учебная";
  const [items, setItems] = useState([]);

  
  //Гет запроса на список
  useEffect(() => {
    axios.get('http://localhost:8080/api/ud')
        .then(response => setItems(response.data))
        .catch(error => console.log(error));
}, []);

  return (
    <div>
      <h1 class="header">Учебная деятельность</h1>
      <DirectionsTable data={items} itemsPerPage={10} />
    </div>
  );
}

export default Ud;
