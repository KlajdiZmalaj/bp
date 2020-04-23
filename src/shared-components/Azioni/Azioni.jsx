import React, { Component } from "react";

import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { azioni } from "config";
import { get, includes } from "lodash";
import "swiper/css/swiper.css";
import Swiper from "react-id-swiper";

class Azioni extends Component {
  render() {
    const { active, accountInfo } = this.props;
    const params = {
      spaceBetween: 10,
      slidesPerView: 5,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 4,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 5,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    };
    return (
      <React.Fragment>
        <hr className="overviw-line" />
        {}

        {get(accountInfo, "profile.role.name") ? (
          <div className="row max-width mt-2 azioni">
            <Swiper
              {...params}
              activeSlideKey={`${
                active === "carica-conto" || active === "configura" ? "3" : "0"
              }`}
            >
              {azioni.map((item) => {
                return includes(
                  item.displayRole,
                  get(accountInfo, "profile.role.name")
                ) ? (
                  <div
                    className="col-6 col-lg-2 p-0 pl-2 pl-lg-2"
                    key={item.id}
                  >
                    <a href={"#/" + item.link}>
                      <div
                        className={
                          "azioni-tab azioni-tab" +
                          (active === item.link ? " active-tab" : "")
                        }
                      >
                        <i className="fas fa-dot-circle"></i>

                        <h2>{item.name}</h2>
                        <i className={`icon ${item.i}`}></i>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div key={item.id} className="d-none" />
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div
            className="row max-width mt-2 azioni py-4"
            style={{ paddingLeft: "30px" }}
          >
            {/* <div className="col-6 col-lg-2 p-0 pl-2 pl-lg-2" key={0}>
              <a href={"#/login"}>
                <div className={"azioni-tab azioni-tab"}>
                  <i className="fas fa-dot-circle"></i>

                  <h2>Login</h2>
                  <i className="icon fal fa-sign-in"></i>
                </div>
              </a>
            </div> */}
            {azioni.map((item) => {
              return (
                item.id === 5 && (
                  <div
                    className="col-6 col-lg-2 p-0 pl-2 pl-lg-2"
                    key={item.id}
                  >
                    <a href={"#/" + item.link}>
                      <div
                        className={
                          "azioni-tab azioni-tab" +
                          (active === item.link ? " active-tab" : "")
                        }
                      >
                        <i className="fas fa-dot-circle"></i>

                        <h2>{item.name}</h2>
                        <i className={`icon ${item.i}`}></i>
                      </div>
                    </a>
                  </div>
                )
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, AuthActions)(Azioni);
