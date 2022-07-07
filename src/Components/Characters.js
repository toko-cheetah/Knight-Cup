import React from "react";

export default function Characters({ value, name, img }) {
  return (
    <option value={value} style={{ backgroundImage: `url(${img})` }}>
      {name}
    </option>
  );
}
