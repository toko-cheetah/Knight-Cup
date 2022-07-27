import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorMessage } from "../helper";

export default function PersonalInfo({
  onChange,
  data,
  validate,
  validateInfo,
  wizardActive,
}) {
  const [type, setType] = useState("text");
  const [error, setError] = useState([]);
  const personalInfoKeys = ["name", "email", "phone", "date_of_birth"];
  const navigate = useNavigate();

  useEffect(() => wizardActive(personalInfoKeys, "wizard-one"));

  useEffect(() => {
    setError(
      personalInfoKeys.map((key) =>
        errorMessage(key, validate[key].title, validate[key].message)
      )
    );
  }, []);

  function validateAndContinue() {
    validateInfo(personalInfoKeys);

    validate.name.isValid &&
      validate.email.isValid &&
      validate.phone.isValid &&
      validate.date_of_birth.isValid &&
      navigate("/chess-experience");
  }

  return (
    <div id="personal-info">
      <header>
        <p>Start creating your account</p>
      </header>

      <main>
        <div className="wizard">
          <div>
            <div className="wizard-1" id="wizard-one">
              <p>1</p>
            </div>

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
          <h2>Personal information</h2>
          <p>This is basic informaton fields</p>
        </div>

        <form id="form-personal-info">
          <div className="form-group">
            <input
              type={"text"}
              className="data-name"
              name="name"
              placeholder="Name"
              onChange={onChange}
              value={data.name}
            />
            <label
              className="placeholder"
              style={{ display: data.name.length ? "none" : "block" }}
            >
              Name
            </label>
          </div>

          <div className="form-group">
            <input
              type={"email"}
              className="data-email"
              name="email"
              placeholder="Email address"
              onChange={onChange}
              value={data.email}
            />
            <label
              className="placeholder"
              style={{ display: data.email.length ? "none" : "block" }}
            >
              Email address
            </label>
          </div>

          <div className="form-group">
            <input
              type={"number"}
              className="data-phone"
              name="phone"
              placeholder="Phone number"
              onChange={onChange}
              value={data.phone}
            />
            <label
              className="placeholder"
              style={{ display: data.phone.length ? "none" : "block" }}
            >
              Phone number
            </label>
          </div>

          <div className="form-group">
            <input
              type={type}
              className="data-date_of_birth"
              onFocus={() => setType("date")}
              onBlur={() => setType("text")}
              name="date_of_birth"
              placeholder="Date of birth"
              onChange={onChange}
              value={data.date_of_birth}
            />
            <label
              className="placeholder"
              style={{ display: data.date_of_birth.length ? "none" : "block" }}
            >
              Date of birth
            </label>
          </div>
        </form>

        <div className="error-message-container">{error}</div>

        <div className="buttons">
          <Link to={"/"}>
            <button className="back">Back</button>
          </Link>

          <button className="next" onClick={validateAndContinue}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
