import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "./StudentMenu.css";
import axios from "axios";

function StudentMenu({ stNum, items }) {

  const [selected, setSelected] = useState();

  const btnRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const options = [
    "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ",
    "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ",
    "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ",
    "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ",
    "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ",
  ];

  //обработка мисклилка для скрытия дроплиста
  useEffect(() => {
    const closeContent = e => {
      if (e.path[0] !== btnRef.current) {
        setIsActive(false);
      }
    };

    document.body.addEventListener('click', closeContent);
    return () => document.body.removeEventListener('click', closeContent);
  }, []);

  const onSubmit = async (idd, selected) => {
    var id = idd
    var course = selected

    if (course === "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ") { course = "НИД" }
    else if (course === "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ") { course = "УД" }
    else if (course === "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ") { course = "ОД" }
    else if (course === "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ") { course = "СД" }
    else if (course === "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ") { course = "КТД" }


    const data = new FormData();
    data.append('id', id);
    data.append('course', course)

    console.log(id);
    console.log(course);

    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // } Вывод содержимого формдаты

    //пут запрос
    // await axios.put(`http://localhost:8080/api/studentRatingManyCourses/`, {
    //   id: id,
    //   course: course
    // })
    //   .then(() => {
    //     console.log("Success!");
    //   })
    //   .catch((e) => {
    //     console.error('Error!', e);
    //   })
  }

  return (
    <form method="put" action="#" id="#" onSubmit={onSubmit}>
      <div className="studentMenu">
        <div class="btn" tabIndex={1} ref={btnRef} className="studentMenu-btn" onClick={() => setIsActive(!isActive)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>

        {isActive && (
          <div className="studentMenu-content">
            {options.map((option) => (
              <div
                onClick={() => {
                  setSelected(option);
                  items.map((item) => {
                    if (item.studnumber === stNum) {
                      onSubmit(item.id, option);
                    };
                  })
                  setIsActive(false);
                }}
                className="studentMenu-item"
              >
                {option}
              </div>
            ))}
            <button class="btn btn-primary">
              Определить
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default StudentMenu;
