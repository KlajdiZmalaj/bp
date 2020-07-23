import { useState, useEffect } from "react";

const CountUp = ({ nr }) => {
  const [count, setstate] = useState(0);
  console.log("ca ka count", nr);
  useEffect(() => {
    setstate(0);
    if (parseInt(nr) > 0) {
      for (let i = 0; i < nr; i++) {
        setTimeout(() => {
          setstate(i);
        }, 100);
      }
    }
  }, [nr]);

  return count;
};

export default CountUp;
