import React, { useState } from "react";
import "./user.css";

function Card(props) {
  
  const [some, setSome] = useState(false);

  const handler = () => {
    setSome(!some);
  };

  return (
    <div onClick={handler} className={some ? "Cardred" : "Card"}>
      {props.name}
    </div>
  );
}

export default Card;
