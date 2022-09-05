import React, { useState, useEffect } from "react";
import axios from "axios";
import FinalTable from "../components/tables/FinalTable";

function FinalList() {
  document.title = "Итоговый список"
  const [items, setItems] = useState([]);


  //Гет запрос на список
  useEffect(() => {
    axios.get('http://localhost:8080/api/finalList')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="header">Итоговый список</h1>
      <FinalTable data={items} itemsPerPage={10} />
    </div>
  )
}

export default FinalList