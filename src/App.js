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
      title: "name",
      isValid: data.name.length > 1,
      message: "Name should be minimum 2 characters long!",
    },
    email: {
      title: "email address",
      isValid:
        data.email.slice(-"@redberry.ge".length) === "@redberry.ge" &&
        data.email.length > "@redberry.ge".length,
      message: "Email should be <name>@redberry.ge",
    },
    phone: {
      title: "phone number",
      isValid: data.phone.length === 9 && !/\D/.test(data.phone),
      message: "Phone should contain 9 number characters",
    },
    date_of_birth: {
      title: "date of birth",
      isValid: data.date_of_birth && data.date_of_birth.length < 11,
      message: "Correct birth date is required!",
    },
    experience_level: {
      title: "level of knowledge",
      isValid: data.experience_level,
      message: "Level of knowledge is required!",
    },
    already_participated: {
      title: "participation information",
      isValid: data.already_participated,
      message: "Participation information is required!",
    },
    character_id: {
      title: "character",
      isValid: data.character_id,
      message: "Character is required!",
    },
  };

  useEffect(() => sessionStorage.setItem("data", JSON.stringify(data)));

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

  function onClick(key, value, inputId, formId) {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));

    hideOptions(inputId, formId);
  }

  function hideOptions(inputId, formId) {
    getEl(inputId).classList.toggle("active");
    getEl(formId).classList.toggle("active");
  }

  const getEl = (id) => document.getElementById(id);
  function wizardActive(array, targetId) {
    let count = 0;

    array.map((el) => data[el].length && (count = count + 1));

    getEl(targetId) &&
      getEl(targetId).classList.toggle("wizard-active", count > 0);
  }

  function validateInfo(array) {
    return array.map((item) => {
      getEl(`error-${item}`).classList.remove("show-error");

      return (
        !validate[item].isValid &&
        (getEl(`error-${item}`).classList.add("show-error"),
        document.querySelector(`.data-${item}`).classList.add("error-style"),
        setTimeout(() => {
          document
            .querySelector(`.data-${item}`)
            .classList.remove("error-style");
        }, 3000))
      );
    });
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
                wizardActive={wizardActive}
              />
            }
          />

          <Route
            path="/chess-experience"
            element={
              <ChessExperience
                onChange={onChange}
                onClick={onClick}
                data={data}
                characters={characters}
                validate={validate}
                validateInfo={validateInfo}
                wizardActive={wizardActive}
                hideOptions={hideOptions}
              />
            }
          />

          <Route path="/completed" element={<Completed />} />
        </Routes>
      </div>
    </div>
  );
}
