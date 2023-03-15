import { Swiper, SwiperSlide } from "swiper/react";

import "./App.css";
import "swiper/css";
import AddCard from "./components/AddCard";
import Month from "./components/Month";
import DataManager from "./context/dataManager";

import React, { useState, useEffect } from "react";
import HoursSettingsCard from "./components/HourSettingsCard";
import AppSettings from "./components/AppSettings";

function App() {
  const [rate,setRate] = useState(initializeRate)
  const [monthsData, setMonthsData] = useState(initializeData);
  const [visible, setVisible] = useState(false);
  const [dataWorkingId, setDataWorkingId] = useState("A1");
  const [MySwiper, setMySwpier] = useState(Swiper);

  function updateData(id, diference) {
    const [year, month, day] = id.split("-");

    setMonthsData((prev) => {
      const newData = prev.map((singleMonth) => {
        if (singleMonth.monthNr == month && singleMonth.year == year) {
          // const newWorkHours = singleMonth.hoursData.map()

          return {
            ...singleMonth,
            hoursData: [
              ...singleMonth.hoursData.map((mday) => {
                if (mday.day == day) {
                  return { ...mday, work: diference };
                } else {
                  return { ...mday };
                }
              }),
            ],
          };
        } else {
          return { ...singleMonth };
        }
      });
      console.log(newData);
      return newData;
    });
  }

  function visibleON() {
    setVisible((prev) => !prev);
  }

  function initializeData() {
    if (localStorage.getItem("StartingData") === null) {
      console.log("No existing Data");
      return [];
    } else {
      const data = JSON.parse(localStorage.getItem("StartingData"));
      console.log("Loading Data");
      return data;
    }
  }

  function initializeRate(){
    if(localStorage.getItem('stawka') === null){
      return 0;
    }
    else{
      const data = localStorage.getItem('stawka');
      return data;
    }
  }


  useEffect(() => {
    localStorage.setItem("StartingData", JSON.stringify(monthsData)),
      [monthsData];
  });

  function existingMonthCheck(monthName, year, monthNr) {
    setMonthsData((prev) => {
      if (
        prev.some(
          (element) => element.monthName == monthName && element.year == year
        )
      ) {
        return prev;
      } else {
        const howManyDays = new Date(year, monthNr + 1, 0).getDate();
        const blankDays = Array.from(Array(howManyDays + 1).keys());
        blankDays.shift();
        console.log(blankDays);

        const blankDaysObj = blankDays.map((item) => {
          return { day: item, work: 0 };
        });

        console.log(blankDaysObj);
        const newP = [
          {
            monthNr: monthNr,
            monthName: monthName,
            year: year,
            hoursData: blankDaysObj,
          },
          ...prev,
        ];
        return newP;
      }
    });
  }

  return (
    <DataManager.Provider
      value={{
        monthsData: monthsData,
        setMonthsData: updateData,
        visible: visible,
        setVisible: visibleON,
        dataWorkingId: dataWorkingId,
        setDataWorkingId: setDataWorkingId,
        rate: rate,
        setRate: setRate
      }}
    >
      {visible && <HoursSettingsCard />}
      <AppSettings></AppSettings>
      <AddCard check={existingMonthCheck} />
      {monthsData.map((item) => {
        return (
          <Month
           key={item.monthNr+item.year}
            monthNr={item.monthNr}
            monthName={item.monthName}
            year={item.year}
            hoursData={item.hoursData}
          ></Month>
        );
      })}
    </DataManager.Provider>
  );
}

export default App;
