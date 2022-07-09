import React from "react";

export default function Characters({ value, name }) {
  return (
    <option value={value} id={`character-${value}`}>
      {name}
    </option>
  );
}
