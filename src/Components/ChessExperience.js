import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Characters from "./Characters";
import { charactersAltData, errorMessage } from "../helper";

export default function PersonalInfo({
  onChange,
  onClick,
  data,
  characters,
  validate,
  validateInfo,
  wizardActive,
  hideOptions,
}) {
  const [characterOptions, setCharacterOptions] = useState([]);
  const [error, setError] = useState([]);
  const chessExperienceKeys = [
    "experience_level",
    "character_id",
    "already_participated",
  ];
  const requestData = {
    ...data,
    already_participated: data.already_participated === "true",
    character_id: Number(data.character_id),
    date_of_birth:
      data.date_of_birth.slice(5, 7) +
      "/" +
      data.date_of_birth.slice(-2) +
      "/" +
      data.date_of_birth.slice(0, 4),
  };
  const navigate = useNavigate();

  const generateCharacters = (array) =>
    array.map((obj) => {
      return (
        <Characters
          key={obj.id}
          value={obj.id}
          name={obj.name}
          img={`https://chess-tournament-api.devtest.ge${obj.image}`}
          onClick={onClick}
        />
      );
    });
  useEffect(() => {
    setCharacterOptions(() => {
      return characters.length
        ? generateCharacters(characters)
        : generateCharacters(charactersAltData);
    });
  }, [characters, charactersAltData]);

  useEffect(() => {
    wizardActive(chessExperienceKeys, "wizard-two");

    characters.length
      ? characters.map(
          (obj) =>
            obj.id == data.character_id &&
            (getEl("character-id").value = obj.name)
        )
      : charactersAltData.map(
          (obj) =>
            obj.id == data.character_id &&
            (getEl("character-id").value = obj.name)
        );

    almostDone();
  });

  const getEl = (id) => document.getElementById(id);
  const saveSelectedInfo = (elId, selected) =>
    getEl(elId) && (getEl(elId)[selected] = true);
  useEffect(() => {
    saveSelectedInfo(`participated-${data.already_participated}`, "checked");
  }, [
    getEl(`participated-${data.already_participated}`),
    characters,
    characterOptions,
  ]);

  useEffect(() => {
    setError(
      chessExperienceKeys.map((key) =>
        errorMessage(key, validate[key].title, validate[key].message)
      )
    );
  }, []);

  function almostDone() {
    let count = 0;
    const keys = Object.keys(data);

    keys.map((key) => data[key].length && (count = count + 1));
    count === keys.length &&
      (getEl("chess-experience-header").textContent = "Almost done!");
  }

  function validateAndSend() {
    validateInfo(chessExperienceKeys);

    validate.experience_level.isValid &&
      validate.character_id.isValid &&
      validate.already_participated.isValid &&
      fetch("https://chess-tournament-api.devtest.ge/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }).then((res) =>
        res.ok
          ? (navigate("/completed"),
            sessionStorage.clear(),
            window.location.reload())
          : alert(
              "An error has occurred! Please, return to the home page and try the registration again!"
            )
      );
  }

  return (
    <div id="chess-experience">
      <header id="chess-experience-header">
        <p>First step is done, continue to finish onboarding</p>
      </header>

      <main>
        <div className="wizard">
          <div>
            <div className="wizard-1 checked-wizard"></div>

            <p>Personal information</p>
          </div>

          <div>
            <div className="wizard-2" id="wizard-two">
              <p>2</p>
            </div>

            <p>Chess experience</p>
          </div>
        </div>

        <div className="heading">
          <h2>Chess experience</h2>
          <p>This is basic informaton fields</p>
        </div>

        <form id="form-chess-experience">
          <div className="custom-dropdown">
            <div className="form-group" id="experience-form">
              <input
                type={"text"}
                value={data.experience_level.replace(
                  /beginner|normal|professional/g,
                  (replace) =>
                    ({
                      beginner: "Beginner",
                      normal: "Intermediate",
                      professional: "Professional",
                    }[replace])
                )}
                onClick={() =>
                  hideOptions("experience-option", "experience-form")
                }
                readOnly
              />
              <label
                className="placeholder data-experience_level"
                style={{
                  display: data.experience_level.length ? "none" : "block",
                }}
              >
                Level of knowledge
              </label>

              <div className="options" id="experience-option">
                <div
                  onClick={() =>
                    onClick(
                      "experience_level",
                      "beginner",
                      "experience-option",
                      "experience-form"
                    )
                  }
                >
                  <p>Beginner</p>
                </div>

                <div
                  onClick={() =>
                    onClick(
                      "experience_level",
                      "normal",
                      "experience-option",
                      "experience-form"
                    )
                  }
                >
                  <p>Intermediate</p>
                </div>

                <div
                  onClick={() =>
                    onClick(
                      "experience_level",
                      "professional",
                      "experience-option",
                      "experience-form"
                    )
                  }
                >
                  <p>Professional</p>
                </div>
              </div>
            </div>

            <div className="form-group" id="character-form">
              <input
                type={"text"}
                id="character-id"
                onClick={() =>
                  hideOptions("character-option", "character-form")
                }
                readOnly
              />
              <label
                className="placeholder data-character_id"
                style={{
                  display: data.character_id.length ? "none" : "block",
                }}
              >
                Choose your character
              </label>

              <div className="options" id="character-option">
                <span>
                  (Total{" "}
                  {characters.length
                    ? characters.length
                    : charactersAltData.length}
                  )
                </span>

                {characterOptions}
              </div>
            </div>
          </div>

          <div id="input-radio">
            <p className="data-already_participated">
              Have you participated in the Redberry Championship?{" "}
              <span className="red-star">*</span>
            </p>

            <label>
              <input
                type={"radio"}
                id={"participated-true"}
                value={true}
                name={"already_participated"}
                onChange={onChange}
              />{" "}
              Yes
            </label>

            <label>
              <input
                type={"radio"}
                id={"participated-false"}
                value={false}
                name={"already_participated"}
                onChange={onChange}
              />{" "}
              No
            </label>
          </div>
        </form>

        <div className="error-message-container">{error}</div>

        <div className="buttons">
          <Link to={"/personal-info"}>
            <button className="back">Back</button>
          </Link>

          <button className="next" id="done" onClick={validateAndSend}>
            Done
          </button>
        </div>
      </main>
    </div>
  );
}
