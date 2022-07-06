import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import LeftSide from "./Components/LeftSide";
import GetStarted from "./Components/GetStarted";
import PersonalInfo from "./Components/PersonalInfo";

function App() {
  const [data, setData] = useState({
    name: storageData("name"),
    email: storageData("email"),
    phone: storageData("phone"),
    date_of_birth: storageData("date_of_birth"),
    experience_level: storageData("experience_level"),
    already_participated: storageData("already_participated"),
    character_id: storageData("character_id"),
  });

  const validate = {
    name: {
      isValid: data.name.length > 1,
      message: "Name should be minimum 2 characters long!",
    },
    email: {
      isValid:
        data.email.slice(-"@redberry.ge".length) === "@redberry.ge" &&
        data.email.length > "@redberry.ge".length,
      message: "Email should be <your email>@redberry.ge",
    },
    phone: {
      isValid: data.phone.length === 9 && !/\D/.test(data.phone),
      message: "Phone should contain 9 number characters",
    },
    date_of_birth: {
      isValid: data.date_of_birth,
      message: "Birth date is required!",
    },
    experience_level: {
      isValid: data.experience_level,
      message: "Experience level is required!",
    },
    already_participated: {
      isValid: data.already_participated,
      message: "Participation information is required!",
    },
    character_id: {
      isValid: data.character_id,
      message: "Character is required!",
    },
  };

  const [isFilling, setIsFilling] = useState({
    background: "none",
    border: "1px solid #e5e6e8",
  });
  // setIsFilling({ background: "#E9FAF1", border: "none" })

  sessionStorage.setItem("data", JSON.stringify(data));

  function storageData(el) {
    const dat = JSON.parse(sessionStorage.getItem("data"));
    return dat ? dat[el] : "";
  }

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
            element={
              <PersonalInfo
                onChange={onChange}
                data={data}
                isFilling={isFilling}
                validate={validate}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
