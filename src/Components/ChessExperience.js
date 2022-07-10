import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Characters from "./Characters";
import { charactersAltData } from "../helper";

export default function PersonalInfo({
  onChange,
  data,
  characters,
  validate,
  validateInfo,
}) {
  const [characterOptions, setCharacterOptions] = useState([]);
  const navigate = useNavigate();
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

  const generateCharacters = (array) =>
    array.map((obj) => {
      return (
        <Characters
          key={obj.id}
          value={obj.id}
          name={obj.name}
          img={`https://chess-tournament-api.devtest.ge${obj.image}`}
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

  const getEl = (id) => document.getElementById(id);
  const saveSelectedInfo = (elId, selected) =>
    getEl(elId) && (getEl(elId)[selected] = true);
  useEffect(() => {
    saveSelectedInfo(`experience-${data.experience_level}`, "selected");
    saveSelectedInfo(`character-${data.character_id}`, "selected");
    saveSelectedInfo(`participated-${data.already_participated}`, "checked");
  }, [
    getEl(`experience-${data.experience_level}`),
    getEl(`character-${data.character_id}`),
    getEl(`participated-${data.already_participated}`),
    characters,
    characterOptions,
  ]);

  function validateAndSend() {
    validateInfo(["experience_level", "character_id", "already_participated"]);

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
      <header>
        <p>First step is done, continue to finish onboarding</p>
      </header>

      <main>
        <div className="wizard">
          <div>
            <div className="wizard-1 checked-wizard"></div>

            <p>Personal information</p>
          </div>

          <div>
            <div className="wizard-2">
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
          <div>
            <select name="experience_level" onChange={onChange}>
              <option value="">Level of knowledge *</option>
              <option id="experience-beginner" value="beginner">
                Beginner
              </option>
              <option id="experience-normal" value="normal">
                Intermediate
              </option>
              <option id="experience-professional" value="professional">
                Professional
              </option>
            </select>

            <select name="character_id" onChange={onChange}>
              <option value="">Choose your character *</option>
              {characterOptions}
            </select>
          </div>

          <div id="input-radio">
            <p>Have you participated in the Redberry Championship? *</p>

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
