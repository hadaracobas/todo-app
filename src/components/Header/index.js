import React, { useState, useEffect } from "react";
import "./index.css";

function Header(props) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setInterval(setCurrentTime(new Date().toLocaleString()), 1000);
  }, [currentTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header__leftContainer">
        <h2>{currentTime}</h2>
      </div>

      <div className="header__rightContainer">
        <h2>you have {props.numOfTodo} Todo</h2>
      </div>
    </header>
  );
}

export default Header;
