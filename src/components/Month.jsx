import React, {useContext} from "react";
import SingleDay from "./SingleDay";

import "./Month.css";
import DataManager from "../context/dataManager";

function Month(props) {
  const ctx = useContext(DataManager)

  const monthName = props.monthName;
  const monthNr = props.monthNr;
  const year = props.year;
  const hoursData = props.hoursData;
  const firstDayOfMonth = new Date(year, monthNr, 1).getDay();

  const workHours = hoursData.map((item) => {
    return item.work;
  });
  const totalWorkHours = workHours.reduce(
    (x, currentValue) => x + currentValue,
    0
  );

  function totalDaysAtWork() {
    const daysAtWork = workHours.filter(value => value > 0)
    return daysAtWork.length
  }


  function capitalizeFirstLetter(word) {
    const newWord = word.split("");
    const capitalizedWord = newWord.map((letter, index) => {
      if (index == 0) {
        return letter.toUpperCase();
      } else {
        return letter;
      }
    });
    return capitalizedWord.join("");
  }
  const emptyDaysMap = {
    1: 0, //Pon
    2: 1, //Wt
    3: 2, //Śr
    4: 3, //Czw
    5: 4, //Pt
    6: 5, //Sobota
    0: 6, //Niedziela
  };

  const emptyDivsList = Array.from(Array(emptyDaysMap[firstDayOfMonth]).keys());
  const emptyDivs = emptyDivsList.map((item) => {
    return <div key={item}></div>;
  });

  return (
    <div className="monthCard shadow">
      <h1>{capitalizeFirstLetter(monthName)}</h1>
      <h6>{year}</h6>
      <div className="daysTable shadow">
        <div>Pn</div>
        <div>Wt</div>
        <div>Śr</div>
        <div>Czw</div>
        <div>Pt</div>
        <div>Sb</div>
        <div>Nd</div>
        {emptyDivs}
        {hoursData.map((element) => {
          const id = `${year}-${monthNr}-${element.day}`;

          return (
            <SingleDay
              key={id}
              id={id}
              day={element.day}
              workHours={element.work}
            ></SingleDay>
          );
        })}
      </div>
      <div className="total">
        <span>{`Godziny: ${totalWorkHours}`}</span>
        <span>{`Dni pracy: ${totalDaysAtWork()}`} </span>
        <span>{`Stawka: ${ctx.rate}`}</span>
        <span>{`Wypłata: ${ctx.rate * totalWorkHours}`}</span>
      </div>
    </div>
  );
}

export default Month;
