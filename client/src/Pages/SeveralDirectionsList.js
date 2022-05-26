import React, { useState, useEffect} from "react";
import SeveralDirectionsTable from "../components/tables/SeveralDirectionsTable";
import axios from "axios";

function SeveralDirectionsList() {
  document.title = "Несколько направлений"

  const [items, setItems] = useState([]);

  //Гет запроса на список
  useEffect(() => {
    axios.get('http://localhost:8080/api/studentRatingManyCourses')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  
  return (
    <div><h1 className='header'>Подавшие на несколько направлений</h1>
        <SeveralDirectionsTable data={items} itemsPerPage={10}/></div>
  )
}

export default SeveralDirectionsList