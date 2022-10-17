import React, { useState, useEffect } from "react";
import "../style/ListLoad.css"
import DropFileInput from "../components/DropFileInput";

function ListLoad() {
  document.title = "Загрузка списков";


  const onInputChange = (e) => {
    // console.log("всем здоровья");
    console.log(files);
  }

  const onFileChange = (e) => {
    //пока не удаляю, там прост ошибку выдает лень фиксить
  }

  return (
    <>
      <div className="row fileLoad_container">
        <DropFileInput onChange={(e) => onInputChange(e)} onFileChange={(files) => onFileChange(files)} />
      </div>
    </>
  );
}

export default ListLoad;
