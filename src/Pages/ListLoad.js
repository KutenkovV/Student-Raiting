import React, { useState } from 'react';
import NIDlist from '../Data/NIDlist.json' //подгружаю данные из json файла в таблицу
import LoadTable from '../components/LoadTable'

function ListLoad() {
  document.title = "Загрузка списков"
  const [data] = useState(NIDlist);

  return (
    <div>
      <h1>Загрузка списков</h1>

      {/* Передаю данные как параметр в компонент */}
      <LoadTable data={data} itemsPerPage={15}/>
    </div>
  )
}

export default ListLoad