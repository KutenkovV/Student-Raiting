import './Dropdown.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Dropdown({ selected, setSelected }) {

    const [isActive, setIsActive] = useState(false);
    const options = [
        "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ", "УЧЕБНАЯ ДЕЯТЕЛЬНОСТЬ", "ОБЩЕСТВЕННАЯ ДЕЯТЕЛЬНОСТЬ",
        "СПОРТИВНАЯ ДЕЯТЕЛЬНОСТЬ", "КУЛЬТУРНО-ТВОРЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ", "СПИСОК ГАС"
    ]

    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                <b className='me-2'>{selected}</b>
                <FontAwesomeIcon icon={faAngleDown} />
            </div>

            {isActive && (
                <div className="dropdown-content">
                    {options.map(option => (
                        <div onClick={(e) => {
                                setSelected(option);
                                setIsActive(false);
                            }} className="dropdown-item">
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default Dropdown