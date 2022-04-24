import React, { useState } from "react";
import NIDlist from "../Data/NIDlist.json";

function Nid() {
  document.title = "Научная";
  const [data] = useState(NIDlist);
  return (
    <div>
      <h1 className="header">Научная деятельность</h1>
    </div>
  );
}

export default Nid;
