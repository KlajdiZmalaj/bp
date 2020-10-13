import React, { useState, useEffect } from "react";
import moment from "moment";
export default () => {
  const [a, b] = useState(1);

  const val = setInterval(() => {
    b(a === 1 ? 2 : 1);
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(val);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);
  return (
    <span className="timeH">{moment().format("DD/MM/YYYY HH:mm:ss")}</span>
  );
};
