import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Characters from "./Characters";

export default function PersonalInfo({ onChange, data, characters, validate }) {
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

  useEffect(() => {
    setCharacterOptions(() => {
      return characters.map((obj) => {
        return (
          <Characters
            key={obj.id}
            value={obj.id}
            name={obj.name}
            img={`https://chess-tournament-api.devtest.ge${obj.image}`}
          />
        );
      });
    });
  }, [characters]);

  function validationAndSend() {
    !validate.experience_level.isValid &&
      alert(validate.experience_level.message);
    !validate.character_id.isValid && alert(validate.character_id.message);
    !validate.already_participated.isValid &&
      alert(validate.already_participated.message);

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
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err)) &&
      navigate("/completed") &&
      sessionStorage.clear();
  }

  // console.log(document.getElementById(data.character_id));

  document.getElementById(data.experience_level) &&
    (document.getElementById(data.experience_level).selected = true);
  document.getElementById(data.character_id) &&
    (document.getElementById(data.character_id).selected = true);
  document.getElementById(data.already_participated) &&
    (document.getElementById(data.already_participated).checked = true);

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
              <option id="beginner" value="beginner">
                Beginner
              </option>
              <option id="intermediate" value="intermediate">
                Intermediate
              </option>
              <option id="professional" value="professional">
                Professional
              </option>
            </select>

            <select name="character_id" onChange={onChange}>
              <option value="">Choose your character *</option>
              {characterOptions}
              <option value={characters.length + 1} id={characters.length + 1}>
                Other
              </option>
            </select>
          </div>

          <div id="input-radio">
            <p>Have you participated in the Redberry Championship? *</p>

            <label>
              <input
                type={"radio"}
                id={"true"}
                value={true}
                name={"already_participated"}
                onChange={onChange}
              />{" "}
              Yes
            </label>

            <label>
              <input
                type={"radio"}
                id={"false"}
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

          <button className="next" id="done" onClick={validationAndSend}>
            Done
          </button>
        </div>
      </main>
    </div>
  );
}