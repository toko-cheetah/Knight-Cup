import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import LeftSide from "./Components/LeftSide";
import GetStarted from "./Components/GetStarted";
import PersonalInfo from "./Components/PersonalInfo";
import ChessExperience from "./Components/ChessExperience";
import Completed from "./Components/Completed";

export default function App() {
  const [data, setData] = useState({
    name: storageData("name"),
    email: storageData("email"),
    phone: storageData("phone"),
    date_of_birth: storageData("date_of_birth"),
    experience_level: storageData("experience_level"),
    already_participated: storageData("already_participated"),
    character_id: storageData("character_id"),
  });
  const [characters, setCharacters] = useState([]);
  const validate = {
    name: {
      isValid: data.name.length > 1,
      message: "Name should be minimum 2 characters long!",
    },
    email: {
      isValid:
        data.email.slice(-"@redberry.ge".length) === "@redberry.ge" &&
        data.email.length > "@redberry.ge".length,
      message: "Email should be <name>@redberry.ge",
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
      message: "Level of knowledge is required!",
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

  sessionStorage.setItem("data", JSON.stringify(data));

  useEffect(() => {
    fetch("https://chess-tournament-api.devtest.ge/api/grandmasters")
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  function storageData(el) {
    const dat = JSON.parse(sessionStorage.getItem("data"));
    return dat ? dat[el] : "";
  }

  function onChange(event) {
    const e = event.target;

    setData((prev) => ({
      ...prev,
      [e.name]: e.value,
    }));
  }

  function validateInfo(array) {
    return array.map(
      (item) => !validate[item].isValid && alert(validate[item].message)
    );
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
                validate={validate}
                validateInfo={validateInfo}
              />
            }
          />

          <Route
            path="/chess-experience"
            element={
              <ChessExperience
                onChange={onChange}
                data={data}
                characters={characters}
                validate={validate}
                validateInfo={validateInfo}
              />
            }
          />

          <Route path="/completed" element={<Completed />} />
        </Routes>
      </div>
    </div>
  );
}
