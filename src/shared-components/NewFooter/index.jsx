import React, { Component } from "react";
import images from "themes/images";
import { skinTexts, skinID } from "config/skinTexts";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //
  render() {
    return (
      <footer>
        <div className="top">
          <div className="maxWFooter">
            <h2>Vuoi diventare un Punto {skinTexts[skinID].name}?</h2>
            <button
              onClick={() => {
                window.location.href = skinTexts[skinID].link4;
              }}
            >
              contattaci subito
            </button>
            <div
              className="chat"
              onClick={() => {
                window.zE("webWidget", "toggle");
              }}
            >
              <i className="fal fa-comments-alt"></i>
            </div>
          </div>
        </div>
        <div className="mid">
          <div className="maxWFooter">
            <div className="colf">
              <img src={images.logoFooter} alt="" />
            </div>
            <div className="colf">
              <h3>contact us</h3>
              <p>{skinTexts[skinID].address}</p>
              <p>
                <b>E-mail:</b> <br />
                {skinTexts[skinID].mail}
              </p>
            </div>
            <div className="colf">
              <p>
                <b>Phone:</b> <br />
                {skinTexts[skinID].cel}
              </p>
            </div>
            <div className="colf newsletter">
              <h3>ISCRIVITI ALLA NEWSLETTER</h3>
              <input type="text" placeholder="Vostro Email" />
              <button>ISCRIVITI</button>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="maxWFooter">
            {" "}
            <p>© Design by Altechsolutions - 2020</p>
            <img src={images.footerBottom} alt="" />
            <div className="socials">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-pinterest"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
