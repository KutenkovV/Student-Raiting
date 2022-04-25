import React, { useState } from "react";
import FinalTable from "../components/tables/FinalTable";
import Final from "../Data/Final.json";


function FinalList() {
  document.title = "Итоговый список"
  const [data] = useState(Final);

  return (
    <div>
      <h1 className="header">Итоговый список</h1>
      <FinalTable data={data} itemsPerPage={15} />
    </div>
  )
}

export default FinalList