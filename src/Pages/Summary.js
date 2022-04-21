import React, { useState } from "react"
import SummaryTable from "../components/SummaryTable"
import SummaryData from "../Data/SummaryList.json"

function Summary() {
  document.title = "Сводка"
  const [data] = useState(SummaryData);
  
  return (
    <>
    <SummaryTable data={data} itemsPerPage={15}/>
    </>

  )
}

export default Summary