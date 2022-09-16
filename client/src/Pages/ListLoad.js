import React, { useState, useEffect } from "react";
import "./ListLoad.css"
import LoadTable from "../components/LoadTable/LoadTable";
import Dropdown from "../components/Dropdown/Dropdown";
import DropFileInput from "../components/DropFileInput/DropFileInput";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from "axios";

function ListLoad() {
  document.title = "Загрузка списков";

  ////////////////// Загрузка списков
  const [file, setFile] = useState([]);

  const onInputChange = (e) => {
    // console.log("пашел нахуй");

    // let data = e.target.files;
    // setFile(data);
    console.log(files);
  }

  const onFileChange = (e) => {
    // for (let i = 0; i < e.length; i++) {
    //   setFile(file => [...file, e[i]]);
    //   console.log(file);
    // }
  }

  return (
    <>
      <DropFileInput onChange={(e) => onInputChange(e)} onFileChange={(files) => onFileChange(files)} />
    </>
  );
}

export default ListLoad;
