import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PersonalInfo({ onChange, data, isFilling, validate }) {
  const [type, setType] = useState("text");
  const navigate = useNavigate();

  function validation() {
    !validate.name.isValid && alert(validate.name.message);
    !validate.email.isValid && alert(validate.email.message);
    !validate.phone.isValid && alert(validate.phone.message);
    !validate.date_of_birth.isValid && alert(validate.date_of_birth.message);

    return (
      validate.name.isValid &&
      validate.email.isValid &&
      validate.phone.isValid &&
      validate.date_of_birth.isValid &&
      navigate("/chess-experience")
    );
  }

  return (
    <div id="personal-info">
      <header>
        <p>Start creating your account</p>
      </header>

      <main>
        <div className="wizard">
          <div>
            <div className="wizard-1" style={isFilling}>
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
            id="name"
            placeholder="Name *"
            onChange={onChange}
            value={data.name}
            required
          />
          <input
            type={"email"}
            id="email"
            placeholder="Email address *"
            onChange={onChange}
            value={data.email}
            required
          />
          <input
            type={"number"}
            id="phone"
            placeholder="Phone number *"
            onChange={onChange}
            value={data.phone}
            required
          />
          <input
            type={type}
            onFocus={() => setType("date")}
            onBlur={() => setType("text")}
            id="date_of_birth"
            placeholder="Date of birth *"
            onChange={onChange}
            value={data.date_of_birth}
            required
          />
        </form>

        <div className="buttons">
          <Link to={"/"}>
            <button className="back">Back</button>
          </Link>

          <button className="next" onClick={validation}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
