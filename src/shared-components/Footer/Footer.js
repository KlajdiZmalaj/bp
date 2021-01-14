import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid">
        <div className="row maxWidth">
          <div className="col-md-10">
            <h6> Copyright © 2013-2019 BPOINT Company. All rights reserved.</h6>
          </div>
          <div className="d-none d-md-block col-md-2">
            <a href="/#" className="fcb">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/#" className="insg">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/#" className="linkin">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
