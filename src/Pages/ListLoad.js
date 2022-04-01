import React from 'react'
import { BasicTable } from '../components/BasicTable'
import '../App.css'
import { PaginationTable } from '../components/PaginationTable'

function ListLoad() {
  document.title = "Загрузка списков"
  return (
    <div>
      <h1>listload</h1>
      <div className='listload'>
        <PaginationTable />
      </div>
    </div>
  )
}

export default ListLoad