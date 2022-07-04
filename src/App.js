import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import LeftSide from "./Components/LeftSide";
import GetStarted from "./Components/GetStarted";
import PersonalInfo from "./Components/PersonalInfo";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    experience_level: "",
    already_participated: "",
    character_id: "",
  });

  sessionStorage.setItem("data", JSON.stringify(data));
  // sessionStorage.clear();

  function onChange(event) {
    const e = event.target;

    setData((prev) => ({
      ...prev,
      [e.id]: e.value,
    }));
  }

  return (
    <div id="app">
      <LeftSide />

      <div id="right-side">
        <Routes>
          <Route exact path="/" element={<GetStarted />} />
          <Route
            path="/personal-info"
            element={<PersonalInfo onChange={onChange} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
