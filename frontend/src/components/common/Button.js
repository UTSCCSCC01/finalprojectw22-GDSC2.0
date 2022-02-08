import React from "react";

const Button = ({ color, padding, background, text }) => {
  const style = {
    padding: padding + "px",
    backgroundColor: background,
    color: color,
  };
  return (
    <>
      <button style={style}>{text}</button>
    </>
  );
};

export default Button;
