import React from "react";

export default function Characters({ value, name, img, onClick }) {
  return (
    <div
      className="character-options"
      onClick={() =>
        onClick(
          "character_id",
          value.toString(),
          "character-option",
          "character-form"
        )
      }
    >
      <p>{name}</p>
      <div>
        <img src={img} alt="Character photo" />
      </div>
    </div>
  );
}
