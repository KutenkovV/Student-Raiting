import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "./StudentMenu.css";

function StudentMenu({ stNum, items, selected, setSelected }) {

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


  return (
    <form>
      <div className="studentMenu">
        <div tabIndex={1} ref={btnRef} className="studentMenu-btn" onClick={() => setIsActive(!isActive)}>
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
                      console.log(item.id);
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
