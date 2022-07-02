import React from "react";
import { Routes, Route } from "react-router-dom";

export default function LeftSide() {
  return (
    <div id="left-side">
      <header>
        <img src={require("../img/Khight-cup-logo.png")} alt="logo" />
      </header>

      <Routes>
        <Route
          exact
          path="/"
          element={<div className="left-side-picture" id="picture-1"></div>}
        />

        <Route
          path="/personal-info"
          element={
            <div className="left-side-picture" id="picture-2">
              <h2>
                “When you see a good move, <br /> look for a better one.”
              </h2>
              <h3>- Emanuel Lasker</h3>
            </div>
          }
        />

        <Route
          path="/chess-experience"
          element={
            <div className="left-side-picture" id="picture-3">
              <h2>
                “Many have become chess masters; <br /> no one has become the
                master of chess.”
              </h2>
              <h3>- Siegbert Tarrasch</h3>
            </div>
          }
        />

        <Route
          path="/completed"
          element={<div className="left-side-picture" id="picture-4"></div>}
        />
      </Routes>
    </div>
  );
}
