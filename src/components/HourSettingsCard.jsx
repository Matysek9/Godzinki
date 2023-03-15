import React, { useContext, useRef, useState } from "react";
import { createContext } from "react";
import DataManager from "../context/dataManager";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./HourSettingsCard.css";
import SingleHour from "./SingleHour";

function HoursSettingsCard() {
  const ctx = useContext(DataManager);

  const [fromHourState, setFromHourState] = useState(0);
  const [fromMinutesState, setFromMinutesState] = useState(0);
  const [toHourState, setToHourState] = useState(0);
  const [toMinuteState, setToMinuteState] = useState(0);

  const fromHourRef = useRef(0);
  const fromMinuteRef = useRef(0);
  const toHourRef = useRef(0);
  const toMinuteRef = useRef(0);

  function displayWorkingDay(data) {
    const splited = data.split("-");
    const rev = splited.reverse();
    return rev;
  } 

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);
  
    return date.toLocaleString('pl-PL', { month: 'long' });
  }

  const daysData = displayWorkingDay(ctx.dataWorkingId)

  function backdropClickHandler(e) {
    if (e.target.className == "position") {
      ctx.setVisible();
    } else {
      return;
    }
  }

  function submitHandler(e) {
    e.preventDefault();
   

    const startHours = fromHourState * 60 + +fromMinutesState;
    const endHours = toHourState * 60 + +toMinuteState;

    const diference = (endHours - startHours) / 60;
    function diferenceCheck(value) {
      if (value < 0) {
        return 0;
      } else return value;
    }

    console.table(startHours, endHours, diference);
    ctx.setMonthsData(ctx.dataWorkingId, diferenceCheck(diference));
    ctx.setVisible();
  }

  return (
    <div className="position" onClick={backdropClickHandler}>
      
        <form className="inputContainer" onSubmit={submitHandler}>
          <div>
            <header>{daysData[0]} {getMonthName(daysData[1])}</header>
            <span className="year">{daysData[2]}</span>
          </div>
          <h6>Rozpoczęcie pracy</h6>
          <div className="selectContainer">
            <select
              ref={fromHourRef}
              onChange={() => {
                setFromHourState(fromHourRef.current.value);
              }}
            >
              <option value={0}>00</option>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
              <option value={7}>07</option>
              <option value={8}>08</option>
              <option value={9}>09</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
            </select>
            :
            <select
              ref={fromMinuteRef}
              onChange={() => {
                setFromMinutesState(fromMinuteRef.current.value);
              }}
            >
              <option value={0}>00</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
          </div>

          <h6>Zakończenie pracy</h6>
          <div className="selectContainer">
            <select
              ref={toHourRef}
              onChange={() => {
                setToHourState(toHourRef.current.value);
              }}
            >
              <option value={0}>00</option>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
              <option value={7}>07</option>
              <option value={8}>08</option>
              <option value={9}>09</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
            </select>
            :
            <select
              ref={toMinuteRef}
              onChange={() => {
                setToMinuteState(toMinuteRef.current.value);
              }}
            >
              <option value={0}>00</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-sm shadow">
            Zapisz
          </button>
        </form>
      </div>
    
  );
}

export default HoursSettingsCard;
