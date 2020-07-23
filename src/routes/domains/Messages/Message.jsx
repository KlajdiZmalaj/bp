import React from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import images from "themes/images";

class Message extends React.Component {
  state = {
    isOpen: false,
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    // const { isOpen } = this.state;
    const { msg } = this.props;

    return (
      <div className="col-md-12">
        <div
          className="panel-tab"
          data-toggle="collapse"
          data-target={`msg` + msg[0]}
        >
          <i className="fas fa-dot-circle"></i>
          <h4>{msg[3]}</h4>
          <span className="date-pane">{msg[2]}</span>
          <i className="fal fa-chevron-down" aria-hidden="true"></i>
        </div>

        <div
          //   className="nav nav-tabs panel-content panel-content-annunci collapse"
          className="nav nav-tabs panel-content panel-content-annunci"
          id={`msg` + msg[0]}
        >
          {msg[4]}
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, AuthActions)(Message);
