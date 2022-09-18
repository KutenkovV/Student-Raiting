import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { faCloudArrowUp, faFileCsv, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../style/DropFileInput.css";
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

    //Гет запрос на список "Сводка"
    useEffect(() => {
        trackPromise(axios.get('http://localhost:8080/api/report'))
            .then(response => setItems(response.data))
            .catch(error => console.log(error));
    }, []);

    //обработка кнопки
    const onSubmit = async (e) => {

        const formatData = new FormData();
        //formatData.append("files", fileList);
        //fileList.forEach(file => formatData.append("files", file))
        for(let i =0; i < fileList.length; i++) {
            formatData.append("files", fileList[i]);
        }
        console.log("Значения таргета ниже:");
        console.log(fileList);

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
    }

    return (
        <>
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
        </>
    )
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput