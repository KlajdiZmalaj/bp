import React, { Component } from "react";
import images from "themes/images";
import { connect } from "react-redux";
import { Footer as FooterMob } from "shared-componentsMobile";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //
  render() {
    const { skinExtras, screenWidth } = this.props;
    // console.log("skinExtras", skinExtras);
    return screenWidth > 1024 ? (
      <footer>
        <div className="top">
          <div className="maxWFooter">
            <h2>Vuoi diventare un Punto {skinExtras.name}?</h2>
            <button
              onClick={() => {
                window.location.href = skinExtras.link4;
              }}
            >
              contattaci subito
            </button>
            {/* <div
              className="chat"
              onClick={() => {
                window.zE("webWidget", "toggle");
              }}
            >
              <i className="fal fa-comments-alt"></i>
            </div> */}
          </div>
        </div>
        <div className="mid">
          <div className="maxWFooter">
            <div className="colf">
              <img src={images.logoFooter} alt="" />
            </div>
            <div className="colf">
              <h3>contact us</h3>
              <p>{skinExtras.address}</p>
              <p>
                <b>E-mail:</b> <br />
                {skinExtras.mail}
              </p>
            </div>
            <div className="colf">
              <p>
                <b>Phone:</b> <br />
                {skinExtras.cel}
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
    ) : (
      <FooterMob />
    );
  }
}

const m = ({ auth, main }) => {
  return {
    skinExtras: auth.skinExtras,
    screenWidth: main.screenWidth,
  };
};
export default connect(m, null)(Footer);
