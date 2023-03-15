import React from "react";

const DataManager = React.createContext({
  monthsData: [],
  setMonthsData: () => {},
  visible : false,
  setVisible : () => {},
  dataWorkingId : "A1",
  setDataWorkingId: ()=>{},
  rate: 0,
  setRate : ()=>{}
  
});

export default DataManager;
