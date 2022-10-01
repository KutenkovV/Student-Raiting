import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faFileCsv, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../style/DropFileInput.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DropFileInput = props => {

    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    //Константа в которую кидаем файлы из дропзоны
    const onFileDrop = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            setFileList(fileList => [...fileList, e.target.files[i]]);
            props.onFileChange(fileList);
        }
    }

    //Штука которая удаляет файл из списка
    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    //Сюда записываю статус ответа от сервера ("ОК" вот эти вот)
    const [status, setStatus] = useState([]);

    const [nidValue, setnidValue] = useState(false)
    const [udValue, setudValue] = useState(false)
    const [sdValue, setsdValue] = useState(false)
    const [odValue, setodValue] = useState(false)
    const [ktdValue, setktdValue] = useState(false)

    const [freeValue, setfreeValue] = useState(false)
    const [vacationValue, setvacationValue] = useState(false)
    const [gasValue, setgasValue] = useState(false)


    useEffect(() => {
        status.map((item) => {
            if (item.title === 'НИД.csv') { setnidValue(true) }
            if (item.title === 'УД.csv') { setudValue(true) }
            if (item.title === 'СД.csv') { setsdValue(true) }
            if (item.title === 'ОД.csv') { setodValue(true) }
            if (item.title === 'КТД.csv') { setktdValue(true) }

            if (item.title === 'Каникулы.csv') { setvacationValue(true) }
            if (item.title === 'Свободный график.csv') { setfreeValue(true) }
            if (item.title === 'ГАС.csv') { setgasValue(true) }
        })
    }, [status]);


    //обработка кнопки
    const onSubmit = async (e) => {

        const formatData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            formatData.append("files", fileList[i]);
        }
        
        e.preventDefault();

        //сам пост запрос
        await axios({
            method: "POST",
            url: "http://localhost:8080/api/listLoad/all",
            data: formatData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => setStatus(response.data))

            //Вот так чистим содержимое, что загружали  
            setFileList([]);
    }

    console.log(status);

    return (
        <div className="row">
            <div className="col-md-6 fileLoad_container">
                <div className="drop-file-input"
                    ref={wrapperRef}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className="drop-file-input__label">
                        <FontAwesomeIcon size="5x" icon={faCloudArrowUp} className="cloud_icon" />
                        <p className='load_text'>Перетащите сюда файлы или нажмите чтобы загрузить</p>
                    </div>
                    <input multiple type="file" accept=".csv" value="" onChange={onFileDrop} />
                </div>
                {
                    fileList.length > 0 ? (
                        <div className="drop-file-preview">
                            <p className="drop-file-preview__title">Готовы к загрузке</p> {
                                fileList.map((item, index) => (
                                    <div key={index} className="drop-file-preview__item">
                                        <FontAwesomeIcon size="2x" className="file_icon" icon={faFileCsv} />
                                        <div className="drop-file-preview__item__info">
                                            <p className='fileName'>{item.name}</p>
                                        </div>
                                        <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    ) : null
                }

                {/* Ниже форма с кнопкой которая делает запрос */}
                <form method="post" action="#" id="#" onSubmit={onSubmit}>
                    <div className="row d-flex justify-content-end">
                        <button class="btn btn-primary col-2 m-4">
                            Загрузить
                        </button>
                    </div>
                </form>
            </div>

            {/* Чек-листы, которые загрузили/не загрузили */}
            <div className="checkList col">
                <div className="checkItem row">
                    <FontAwesomeIcon icon={nidValue ? faCheck : faXmark} className={nidValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Научная деятельность
                    </p>
                </div>
                <div className="checkItem row">
                    <FontAwesomeIcon icon={udValue ? faCheck : faXmark} className={udValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Учебная деятельность
                    </p>
                </div>
                <div className="checkItem row">
                    <FontAwesomeIcon icon={odValue ? faCheck : faXmark} className={odValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Общественная деятельность
                    </p>
                </div>
                <div className="checkItem row">
                    <FontAwesomeIcon icon={sdValue ? faCheck : faXmark} className={sdValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Спортивная деятельность
                    </p>
                </div>
                <div className="checkItem row">
                    <FontAwesomeIcon icon={ktdValue ? faCheck : faXmark} className={ktdValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Культурно-творческая деятельность
                    </p>
                </div>
                <div className="checkItem row">
                    <FontAwesomeIcon icon={freeValue ? faCheck : faXmark} className={freeValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Студенты со свободным графиком
                    </p>
                </div>
                <div className="checkItem row">
                    <FontAwesomeIcon icon={vacationValue ? faCheck : faXmark} className={vacationValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Студенты на каникулах
                    </p>
                </div>
                <div className="checkItem row">
                    <FontAwesomeIcon icon={gasValue ? faCheck : faXmark} className={gasValue ? "col-1 succesIcon" : "col-1 errorIcon"} />
                    <p className="checkText col">
                        Студенты, получающие государственную академическую стипендию
                    </p>
                </div>
            </div>
        </div>
    )
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput