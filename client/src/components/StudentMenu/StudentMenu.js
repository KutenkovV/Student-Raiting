import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "./StudentMenu.css";
import axios from "../../http/api";

function StudentMenu({ StudentDirections, stNum, items, onChange }) {
  const [selected, setSelected] = useState();

  const btnRef = useRef(); // специальный хук, который передает нам состояние (или даже путь) отрендеренного объекта

  const [isActive, setIsActive] = useState();

  // Обрабатываем мисклик
  useEffect(() => {
    const handler = (event) => {
      if (btnRef.current && !btnRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const onSubmit = async (e) => {
    var id;
    var course = selected;

    items.map((item) => {
      if (item.studnumber === stNum) {
        id = item.id;
      }
    });

    // Эта строчка делает что-то умное
    e.preventDefault();

    console.log(id);
    console.log(course);

    if (course === "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ") {
      course = "НИД";
    } else if (course === "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ") {
      course = "УД";
    } else if (course === "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ") {
      course = "ОД";
    } else if (course === "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ") {
      course = "СД";
    } else if (course === "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ") {
      course = "КТД";
    }

    //пут запрос
    await axios.put("/api/studentRatingManyCourses/", {
      id: id,
      course: course,
    });

    //крч долго объяснять, тут я передаю данные от grandchild компонента к parent компоненту
    onChange(selected);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="studentMenu">
        <div
          class="btn"
          tabIndex={1}
          className="studentMenu-btn"
          onClick={() => setIsActive(!isActive)}
        >
          <FontAwesomeIcon
            className="studentMenu-fontBtn"
            icon={faEllipsisVertical}
          />
        </div>

        {isActive && (
          <div ref={btnRef} className="studentMenu-content">
            {StudentDirections.map((option) => (
              <div
                onClick={() => {
                  setSelected(option);
                }}
                tabIndex={2}
                className="studentMenu-item"
              >
                {option}
              </div>
            ))}
            <div className="studentMenu-define">
              <button class="btn btn-primary">Определить</button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default StudentMenu;
