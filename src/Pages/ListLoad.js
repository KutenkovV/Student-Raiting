import React from 'react'
import { BasicTable } from '../components/BasicTable'

function ListLoad() {
  document.title = "Загрузка списков"
  return (
    <div className='listload'>
      <h1>listload</h1>
      <BasicTable />
    </div>
  )
}

export default ListLoad