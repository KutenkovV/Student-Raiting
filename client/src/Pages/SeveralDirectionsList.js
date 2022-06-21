import React, { useState, useEffect } from "react";
import SeveralDirectionsTable from "../components/tables/SeveralDirectionsTable";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from "axios";

function SeveralDirectionsList() {
  document.title = "Несколько направлений"

  const [items, setItems] = useState([]);
  const { promiseInProgress } = usePromiseTracker(); //промис который отвечает за "Загрузка..."

  //Гет запрос на список "Несколько направлений"
  useEffect(() => {
    trackPromise(axios.get('http://localhost:8080/api/studentRatingManyCourses'))
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div>
      <h1 className='header'>Подавшие на несколько направлений</h1>

      {/* блокс с промисом "загрузки..." */}
      {promiseInProgress
        ? <div>Загрузка...</div> : <SeveralDirectionsTable data={items} itemsPerPage={10} />
      }
    </div>
  )
}

export default SeveralDirectionsList