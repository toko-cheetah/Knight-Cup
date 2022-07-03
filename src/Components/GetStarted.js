import React from "react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div id="get-started">
      <h1>
        Chess says <span>a lot about</span> <br /> who we are
      </h1>

      <Link to="/personal-info">
        <button>Get started</button>
      </Link>
    </div>
  );
}
