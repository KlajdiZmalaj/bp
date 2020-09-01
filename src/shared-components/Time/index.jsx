import React, { useState, useEffect } from "react";
import moment from "moment";
export default () => {
  const [a, b] = useState(1);

  const val = setInterval(() => {
    b(1 + a);
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(val);
    };
  });

  return (
    <span className="timeH">{moment().format("DD/MM/YYYY HH:mm:ss")}</span>
  );
};
