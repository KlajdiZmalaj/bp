import React from // , { useState, useEffect }

"react";
import moment from "moment";

class Time extends React.Component {
  state = {
    render: 0,
  };
  val = setInterval(() => {
    this.setState((s) => ({ render: s.render + 1 }));
  }, 1000);
  componentWillUnmount() {
    clearInterval(this.val);
  }
  render() {
    // console.log("redneerr");
    return (
      <span className="timeH">{moment().format("DD/MM/YYYY HH:mm:ss")}</span>
    );
  }
}

// const Time = () => {
//   const [a, b] = useState(1);
//   let val = setTimeout(() => {
//     b(a + 1);
//   }, 1000);
//   useEffect(() => {
//     return () => {
//       clearTimeout(val);
//     };
//   }, []);
//   console.log(" ss  rendered");
//   return (
//     <span className="timeH">{moment().format("DD/MM/YYYY HH:mm:ss")}</span>
//   );
// };

//skip rerender > parent render
export default React.memo(Time);
