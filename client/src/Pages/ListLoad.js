import React, { useState, useEffect } from "react";
import "../style/ListLoad.css"
import LoadTable from "../components/LoadTable/LoadTable";
import Dropdown from "../components/Dropdown/Dropdown";
import DropFileInput from "../components/DropFileInput";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
    <div className="row">
      <DropFileInput onChange={(e) => onInputChange(e)} onFileChange={(files) => onFileChange(files)}/>
      <div className="checkList col">
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Научная деятельность
          </p>
        </div>
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Учебная деятельность
          </p>
        </div>
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Общественная деятельность
          </p>
        </div>
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Спортивная деятельность
          </p>
        </div>
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Культурно-творческая деятельность
          </p>
        </div>
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Студенты со свободным графиком
          </p>
        </div>
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Студенты на каникулах
          </p>
        </div>
        <div className="checkItem row">
        <FontAwesomeIcon icon={faCheck} className="col-1 succesIcon" />
          <p className="checkText col">
            Студенты, получающие государственную академическую стипендию
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ListLoad;
