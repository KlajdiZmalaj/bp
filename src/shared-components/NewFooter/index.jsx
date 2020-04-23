import React, { Component } from "react";
import images from "themes/images";

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
            <h2>Vuoi diventare un Punto BPoint?</h2>
            <button
              onClick={() => {
                window.location.href = "https://bpoint.store/contatti/";
              }}
            >
              conttataci subito
            </button>
            <div className="chat">
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
              <p>
                Viale XXIII Settembre 1845 n. 67 <br />
                Rimini (RN) Italia
              </p>
              <p>
                <b>E-mail:</b> <br />
                info@bpoint.store
              </p>
            </div>
            <div className="colf">
              <p>
                <b>Phone:</b> <br />
                +39 0541 087890
              </p>
            </div>
            <div className="colf newsletter">
              <h3>ISCRIVITI ALLA NEWSLETTER</h3>
              <input type="text" placeholder="EMAIL" />
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
