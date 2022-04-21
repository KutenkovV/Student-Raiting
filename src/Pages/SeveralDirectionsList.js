import React, { useState } from "react";
import SeveralDirectionsTable from "../components/SeveralDirectionsTable";
import SeveralDirections from "../Data/SeveralDirections.json";

function SeveralDirectionsList() {
  document.title = "Несколько направлений"
  const [data] = useState(SeveralDirections);
  
  return (
    <div><h1 className='header'>Подавшие на несколько направлений</h1>
        <SeveralDirectionsTable data={data} itemsPerPage={15}/></div>
  )
}

export default SeveralDirectionsList