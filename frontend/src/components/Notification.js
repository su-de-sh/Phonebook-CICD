import React from "react";

const Notification = ({ message, type }) => {
  let style = {
    color: "green",
    border: "solid 3px green",
    padding: "8px",
    borderRadius: "4px",
  };

  if (type && type === "alert") {
    style = { ...style, color: "red", border: "solid 3px red" };
  }

  if (message === null) return null;
  else return <div style={style}>{message}</div>;
};

export default Notification;
