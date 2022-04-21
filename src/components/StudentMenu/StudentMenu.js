import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function StudentMenu({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="">
      <div className="" onClick={(e) => setIsActive(!isActive)}>
        <FontAwesomeIcon icon={faEllipsisVertical }/>
      </div>
    </div>
  );
}

export default StudentMenu;
