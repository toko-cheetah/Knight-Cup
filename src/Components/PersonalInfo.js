import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PersonalInfo({
  onChange,
  data,
  validate,
  validateInfo,
}) {
  const [type, setType] = useState("text");
  const navigate = useNavigate();

  function validateAndContinue() {
    validateInfo(["name", "email", "phone", "date_of_birth"]);

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
            <div className="wizard-1">
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
          <input
            type={"text"}
            name="name"
            placeholder="Name *"
            onChange={onChange}
            value={data.name}
          />
          <input
            type={"email"}
            name="email"
            placeholder="Email address *"
            onChange={onChange}
            value={data.email}
          />
          <input
            type={"number"}
            name="phone"
            placeholder="Phone number *"
            onChange={onChange}
            value={data.phone}
          />
          <input
            type={type}
            onFocus={() => setType("date")}
            onBlur={() => setType("text")}
            name="date_of_birth"
            placeholder="Date of birth *"
            onChange={onChange}
            value={data.date_of_birth}
          />
        </form>

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
