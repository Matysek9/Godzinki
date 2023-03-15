import React from "react";



import "./AddCard.css";

function AddCard(props) {
  
  function addNewMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const monthNr = now.getMonth()
    const monthName = now.toLocaleString('default',{month : 'long'})
    console.log(monthName, year, monthNr)
    props.check(monthName,year,monthNr)
  }

  return (
    <div className="shadow Mycard" onClick={addNewMonth}>
      <div className="addCard">
        <span>&#43;</span>
      </div>
    </div>
  );
}

export default AddCard;
