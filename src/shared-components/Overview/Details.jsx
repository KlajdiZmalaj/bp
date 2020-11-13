// import React, { Component } from "react";
// import { Chart } from "react-charts";

// export class Details extends Component {
//   state = {
//     visible: true,
//     data: [
//       {
//         label: "Saldo",
//         data: [
//           [0, 1],
//           [1, 2],
//           [2, 4],
//           [3, 2],
//           [4, 7],
//         ],
//       },
//     ],
//     axes: [
//       { primary: true, type: "linear", position: "bottom" },
//       { type: "linear", position: "left" },
//     ],
//   };
//   render() {
//     return (
//       this.state.visible && (
//         <React.Fragment>
//           <div className="details">
//             <div
//               style={{
//                 width: "400px",
//                 height: "300px",
//               }}
//             >
//               <Chart tooltip data={this.state.data} axes={this.state.axes} />
//             </div>
//           </div>
//           <div
//             className="backDrop"
//             onClick={() => {
//               this.setState({ visible: false });
//             }}
//           ></div>
//         </React.Fragment>
//       )
//     );
//   }
// }

// export default Details;
