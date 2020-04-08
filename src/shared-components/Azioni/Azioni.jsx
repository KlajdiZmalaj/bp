import React, { Component } from "react";

import images from "themes/images";

import { azioni } from "config";
import "swiper/css/swiper.css";
import Swiper from "react-id-swiper";

class Azioni extends Component {
  render() {
    const { active } = this.props;
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
        {/* <div className="row max-width">
          <div className="col pl-3 p-lg-0">
            <a href="/#" className="overview-btn">
              <img src={images.tickets} alt="ticket" /> Menu
            </a>
          </div>
        </div> */}
        <hr className="overviw-line" />
        <div className="row max-width mt-2 azioni">
          <Swiper {...params}>
            {azioni.map((item) => {
              return (
                <div className="col-6 col-lg-2 p-0 pl-2 pl-lg-2" key={item.id}>
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
              );
            })}
          </Swiper>
          {/* <div className="col-6 col-lg-2 p-0 pl-lg-2">
            <a href="#/dashboard">
              <div className="azioni-tab azioni-tab5 active-tab">
                <i className="fas fa-dot-circle"></i>
                <h2>acquista</h2>
              </div>
            </a>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Azioni;
