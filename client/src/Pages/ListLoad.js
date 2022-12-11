import React, { useState, useEffect } from "react";
import "../style/ListLoad.css";
import DropFileInput from "../components/DropFileInput";

function ListLoad() {
  document.title = "Загрузка списков";

  // В душе не понимаю как работают эти константы, но раз
  // работают, то оставлю всё как есть :)))
  const onInputChange = (e) => {
    // console.log("всем здоровья");
    console.log(files);
  };

  const onFileChange = (e) => {
    //пока не удаляю, там прост ошибку выдает лень фиксить
  };

  return (
    <>
      <h1 className="header">Загрузка списков</h1>
      <div className="row m-0 mt-4 fileLoad_container">
        <DropFileInput
          onChange={(e) => onInputChange(e)}
          onFileChange={(files) => onFileChange(files)}
        />
      </div>
    </>
  );
}

export default ListLoad;
