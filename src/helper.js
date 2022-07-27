import { nanoid } from "nanoid";

export const charactersAltData = [
  { id: 1, name: "Nona Gaphrindashvili", image: "/images/nona.jpg" },
  { id: 2, name: "Mikhail Tal", image: "/images/mikhail.jpg" },
  { id: 3, name: "Bobby Fisher", image: "/images/bobby.webp" },
  { id: 4, name: "Magnus Carlsen", image: "/images/magnus.jpg" },
];

export function errorMessage(key, title, message) {
  function hideError() {
    document.getElementById(`error-${key}`).classList.remove("show-error");
  }

  return (
    <div key={nanoid()} className="error-message" id={`error-${key}`}>
      <div>
        <div>
          <img src={require("./img/ExclamationCircle.png")} alt="Error icon" />
          <p>Invalid {title}</p>
        </div>

        <div className="close-error-tab" onClick={hideError}>
          <img src={require("./img/x-icon.png")} alt="X icon" />
        </div>
      </div>

      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}
