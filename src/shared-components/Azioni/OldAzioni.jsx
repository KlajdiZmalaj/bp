// import React, { Component } from "react";

// import { connect } from "react-redux";
// import { AuthActions } from "redux-store/models";
// import { azioni } from "config";
// import { get, includes } from "lodash";
// import "swiper/css/swiper.css";
// import Swiper from "react-id-swiper";

// class Azioni extends Component {
//   render() {
//     const { active, accountInfo } = this.props;
//     const params = {
//       mousewheel: true,
//       activeSlideKey: active === "dashboard" ? "0" : active,
//       breakpoints: {
//         // when window width is >= 320px
//         320: {
//           slidesPerView: 1,
//         },

//         // when window width is >= 640px
//         640: {
//           slidesPerView: 6,
//         },
//       },
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//     };
//     const slides = azioni.map((item, ind) => {
//       return includes(
//         item.displayRole,
//         get(accountInfo, "profile.role.name")
//       ) ? (
//         <div key={item.link}>
//           <a href={"#/" + item.link}>
//             <div
//               className={
//                 "azioni-tab azioni-tab" +
//                 (active === item.link ? " active-tab" : "")
//               }
//             >
//               <i className="fas fa-dot-circle"></i>

//               <h2>{item.name}</h2>
//               <i className={`icon ${item.i}`}></i>
//             </div>
//           </a>
//         </div>
//       ) : (
//         <div key={item.id} style={{ display: "none" }}></div>
//       );
//     });
//     return (
//       <React.Fragment>
//         <hr className="overviw-line" />
//         {get(accountInfo, "profile.role.name") ? (
//           <div
//             className="row max-width mt-2 azioni"
//             key={Math.random() + slides.id}
//           >
//             <Swiper
//               key={Math.random() + slides.id * 2}
//               activeSlideKey={active}
//               {...params}
//             >
//               {slides}
//             </Swiper>
//           </div>
//         ) : (
//           <div
//             className="row max-width mt-2 azioni py-4"
//             style={{ paddingLeft: "30px" }}
//           >
//             {/* <div className="col-6 col-lg-2 p-0 pl-2 pl-lg-2" key={0}>
//               <a href={"#/login"}>
//                 <div className={"azioni-tab azioni-tab"}>
//                   <i className="fas fa-dot-circle"></i>

//                   <h2>Login</h2>
//                   <i className="icon fal fa-sign-in"></i>
//                 </div>
//               </a>
//             </div> */}
//             {azioni.map((item) => {
//               return (
//                 item.id === 5 && (
//                   <div
//                     className="col-6 col-lg-2 p-0 pl-2 pl-lg-2"
//                     key={Math.random() + item.id * 2}
//                   >
//                     <a href={"#/" + item.link}>
//                       <div
//                         className={
//                           "azioni-tab azioni-tab" +
//                           (active === item.link ? " active-tab" : "")
//                         }
//                       >
//                         <i className="fas fa-dot-circle"></i>

//                         <h2>{item.name}</h2>
//                         <i className={`icon ${item.i}`}></i>
//                       </div>
//                     </a>
//                   </div>
//                 )
//               );
//             })}
//           </div>
//         )}
//       </React.Fragment>
//     );
//   }
// }

// const mapsStateToProps = (state) => ({
//   accountInfo: state.auth.accountInfo,
// });

// export default connect(mapsStateToProps, AuthActions)(Azioni);
