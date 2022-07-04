import React from "react";
import { Link } from "react-router-dom";

export default function PersonalInfo({ onChange }) {
  return (
    <div>
      <header>
        <p>Start creating your account</p>
      </header>

      <main>
        <div className="heading">
          <h2>Personal information</h2>
          <p>This is basic informaton fields</p>
        </div>

        <form>
          <input
            type={"text"}
            id="name"
            placeholder="Name *"
            onChange={onChange}
            required
          />
          <input
            type={"email"}
            id="email"
            placeholder="Email address *"
            onChange={onChange}
            required
          />
          <input
            type={"number"}
            id="phone"
            placeholder="Phone number *"
            onChange={onChange}
            required
          />
          <input
            type={"date"}
            id="date_of_birth"
            placeholder="Date of birth *"
            onChange={onChange}
            required
          />
        </form>

        <div className="buttons">
          <Link to={"/"}>
            <button className="back">Back</button>
          </Link>

          <button className="next">Next</button>
        </div>
      </main>
    </div>
  );
}
