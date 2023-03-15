import "./AppSettings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useRef , useContext} from "react";
import DataManager from "../context/dataManager";

const icon = <FontAwesomeIcon icon={faCog} />;

function AppSettings() {
  const [state, setState] = useState(false);
  const ctx = useContext(DataManager)
  const rateRef = useRef(0);

  function settingsClickHandler() {
    setState((prev) => !prev);
    console.log(state);
  }

  function hourSubmitHandler(e){
    // e.preventDefault();
    const rate = rateRef.current.value;
    localStorage.setItem('stawka', rate)
    ctx.setRate(rate);
  }

  return (
    <div className="settingsPosition">
      <button className="myBtn" onClick={settingsClickHandler}>
        {icon}
      </button>
      {state && (
        <div className="settingsBackdrop">
          <div className="inputContainer">
            <form onSubmit={hourSubmitHandler}>
              <span>Stawka godzinowa</span>
              <input type={"number"} step={0.5} ref={rateRef} defaultValue={0}></input>
              <button type="submit" className="btn btn-primary btn-sm">Zapisz</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppSettings;
