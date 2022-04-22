import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./StudentMenu.css";

function StudentMenu() {
  const [isActive, setIsActive] = useState(false);
  const options = [
    "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ",
    "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ",
    "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ",
    "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ",
    "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ",
  ];

  return (
    <div className="studentMenu">
      <div className="studentMenu-btn" onClick={(e) => setIsActive(!isActive)}>
        <FontAwesomeIcon icon={faEllipsisVertical }/>
      </div>
      {isActive && (
        <div className="studentMenu-content">
          {options.map((option) => (
            <div
                onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="studentMenu-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentMenu;
