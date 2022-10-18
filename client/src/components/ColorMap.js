import React from "react";

function ColorMap() {
  return (
    <>
      <div className="row colorMap_container m-0">
        <div className="colorMap d-flex justify-content-center colorMap_enoughPoints col mt-2">
          <p>Получают стипендию</p>
        </div>
        <div className="colorMap d-flex justify-content-center colorMap_vacation col mt-2">
          <p>На каникулах</p>
        </div>
        <div className="colorMap d-flex justify-content-center colorMap_free col mt-2">
          <p>Свободный график</p>
        </div>
      </div>
    </>
  );
}

export default ColorMap;
