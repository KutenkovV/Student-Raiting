import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

function Dropdown({ selected, setSelected }) {
  
  const btnRef = useRef();
  const [isActive, setIsActive] = useState(false);

  // нужно сделать переключение активности при мисклике
  // https://www.youtube.com/watch?v=pE4bwPykUF4

  const options = [
    "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ",
    "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ",
    "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ",
    "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ",
    "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ",
    "СПИСОК ГАС",
    "СВОБОДНЫЙ ГРАФИК",
    "КАНИКУЛЫ"
  ];

  //обработка мисклилка для скрытия дроплиста
  useEffect(() => {
    const closeContent = e => {
      if (e.path[1] !== btnRef.current) {
        setIsActive(false);
      }
    };

    document.body.addEventListener('click', closeContent);
    return () => document.body.removeEventListener('click', closeContent);
  }, []);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" ref={btnRef} onClick={() => setIsActive(!isActive)}>
        <b className="me-2">{selected}</b>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>

      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={() => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
