import React from "react";

const Prayers = ({ name, time }) => {
  return (
    <div className="prayers">
      <p className="name_prayers">{name}</p>
      <p className="time_prayers">{time}</p>
    </div>
  );
};

export default Prayers;
