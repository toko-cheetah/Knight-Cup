import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Characters from "./Characters";

export default function PersonalInfo({ onChange, data, characters, validate }) {
  const [characterOptions, setCharacterOptions] = useState([]);
  const navigate = useNavigate();

  console.log(data);

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

  function validation() {
    !validate.experience_level.isValid &&
      alert(validate.experience_level.message);
    !validate.character_id.isValid && alert(validate.character_id.message);
    !validate.already_participated.isValid &&
      alert(validate.already_participated.message);

    return (
      validate.experience_level.isValid &&
      validate.character_id.isValid &&
      validate.already_participated.isValid &&
      navigate("/completed")
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
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="professional">Professional</option>
            </select>

            <select name="character_id" onChange={onChange}>
              <option value="">Choose your character *</option>
              {characterOptions}
              <option value={characters.length + 1}>Other</option>
            </select>
          </div>

          <div id="input-radio">
            <p>Have you participated in the Redberry Championship? *</p>

            <label>
              <input
                type={"radio"}
                value={true}
                name={"already_participated"}
                onChange={onChange}
              />{" "}
              Yes
            </label>

            <label>
              <input
                type={"radio"}
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

          <button className="next" id="done" onClick={validation}>
            Done
          </button>
        </div>
      </main>
    </div>
  );
}
