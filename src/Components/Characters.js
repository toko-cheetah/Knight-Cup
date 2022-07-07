import React from "react";

export default function Characters({ value, name, img }) {
  return (
    <option value={value} id={value} style={{ backgroundImage: `url(${img})` }}>
      {name}
    </option>
  );
}
