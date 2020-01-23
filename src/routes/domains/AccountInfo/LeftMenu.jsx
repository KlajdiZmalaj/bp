import React, { Component } from "react";
import { profileLinks } from "config";
import { connect } from "react-redux";
import { MainActions } from "redux-store/models";
class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("props", this.props);
    return (
      <div className="leftMenuAcc">
        {profileLinks.map(item => {
          return (
            <div
              onClick={() => {
                this.props.setAccount(item.name);
              }}
              key={item.id}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(null, { ...MainActions })(LeftMenu);
