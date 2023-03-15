import React, { useContext,useState } from "react";
import DataManager from "../context/dataManager";

import "./SingleDay.css";

function SingleDay(props) {
  const ctx = useContext(DataManager);

  const id = props.id;

  function work(data) {
    if (data > 0) {
      return data;
    } else return "";
  }

  function changeDay() {
    ctx.setDataWorkingId(id)
    ctx.setVisible();

    //Wyświetlanie ekranu zmiany godzin
  }

  return (
    <div className="singleDay shadow height" onClick={changeDay}>
      <span className="day">{props.day}</span>
      <span className="workHours ">{work(props.workHours)}</span>
    </div>
  );
}

export default SingleDay;
