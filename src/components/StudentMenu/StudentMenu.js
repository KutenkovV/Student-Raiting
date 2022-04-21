import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./StudentMenu.css";

function StudentMenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="studentMenu">
      <div className="studentMenu-btn" onClick={(e) => setIsActive(!isActive)}>
        <FontAwesomeIcon icon={faEllipsisVertical }/>
      </div>
      {isActive && (
        <div className="studentMenu-content">
            <div className="studentMenu-item"                 
                onClick={(e) => {
                setIsActive(false);}
                }>
              <p>епаресете</p>
            </div>
        </div>
      )}
    </div>
  );
}

export default StudentMenu;
