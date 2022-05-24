import React, { useState, useEffect } from "react";
import axios from "axios";
import NidTable from "../components/tables/NidTable";

function Nid() {
  document.title = "Научная";
  const [items, setItems] = useState([]);

  //Гет запроса на список
  useEffect(() => {
    axios.get('http://localhost:8080/api/nid')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="header">Научная деятельность</h1>
      <NidTable data={items} itemsPerPage={18} />
    </div>
  );
}

export default Nid;
