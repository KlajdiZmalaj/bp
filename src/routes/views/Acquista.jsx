import React from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import { Overview, Azioni, Header } from "shared-components";

class Acquista extends React.Component {
  componentDidMount() {
    this.props.getServices();
  }
  render() {
    const { services } = this.props;
    console.log(services)
    return (
      <div>
        <Header></Header>
        <Overview></Overview>
        <div className="container-fluid mobileNav-Content">
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
        {/* overview */}
        <div className="container-fluid overview ">
          <Azioni active="dashboard"></Azioni>

          <div className="panels-container">
            <h1 className="max-width heading-tab">Aquista</h1>
            <div className="row no-gutters max-width">
                Tesstttttt
            </div>
          </div>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>

      </div>
    );
  }
}

const mapsStateToProps = state => ({
  services: state.auth.services,
  accountInfo: state.auth.accountInfo
});

export default connect(mapsStateToProps, AuthActions)(
    Acquista
);
