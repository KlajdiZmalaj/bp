import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import SingleError from "./SingleError";
import "./style.css";

export class SupportBody extends Component {
  state = {
    filteredArray: null,
    skinFilter: "",
    userNameFilter: "",
    utenteFilter: "",
    servizioFilter: "",
  };
  componentDidMount() {
    this.props.getErrors();
  }

  filterUsernameByStringValue = (errors, string) => {
    const result = errors.filter((error) => {
      return error.username
        ? error.username.toLowerCase().includes(string.toLowerCase())
        : false;
    });
    return result;
  };
  filterUtenteByStringValue = (errors, string) => {
    const result = errors.filter((error) => {
      return error.user_full_name
        ? error.user_full_name.toLowerCase().includes(string.toLowerCase())
        : false;
    });
    return result;
  };
  filterServizioByStringValue = (errors, string) => {
    const result = errors.filter((error) => {
      return error.title
        ? error.title.toLowerCase().includes(string.toLowerCase())
        : false;
    });
    return result;
  };
  filterByDate = (errors, startDate, endDate) => {
    const result = errors.filter((error) => {
      const errorDate = Date.parse(error.full_time);
      const startDateFilter = Date.parse(startDate);
      const endDateFilter = Date.parse(endDate);
      // console.log(errorDate, startDateFilter, endDateFilter);
      console.log(startDateFilter >= errorDate <= endDateFilter);
      return startDateFilter >= errorDate <= endDateFilter;
    });
    return result;
  };
  componentDidUpdate() {
    if (this.state.filteredArray == null && this.props.errors.length >= 1) {
      this.setState({ filteredArray: this.props.errors });
    }
  }
  render() {
    const { errors } = this.props;
    console.log(errors);
    console.log(
      this.filterByDate(
        errors,
        "2020-07-14T10:00:49.000000Z",
        "2020-07-17T15:35:06.000000Z"
      )
    );
    return (
      <div className="accountInfo">
        {/* <Select
          onChange={(value) => {
            this.setState({ skinFilter: value });
          }}
          defaultValue={"Selezionare Evento"}
        >
          <Option value="0">Selezionare Evento</Option>
          <Option value="1">Concerti</Option>
          <Option value="2">Sport</Option>
          <Option value="3">Museo</Option>
          <Option value="4">Teatro</Option>
          <Option value="5">Altro</Option>
        </Select> */}

        {/* <input
          type="text"
          placeholder="username"
          value={this.state.userNameFilter}
          onChange={(e) => {
            this.setState({
              userNameFilter: e.target.value,
            });
            this.setState({
              filteredArray: this.filterUsernameByStringValue(
                this.props.errors,
                e.target.value
              ),
            });
          }}
        />
        <input
          type="text"
          placeholder="utente"
          value={this.state.utenteFilter}
          onChange={(e) => {
            this.setState({
              utenteFilter: e.target.value,
            });
            this.setState({
              filteredArray: this.filterUtenteByStringValue(
                this.props.errors,
                e.target.value
              ),
            });
          }}
        />
        <input
          type="text"
          placeholder="servizio"
          value={this.state.servizioFilter}
          onChange={(e) => {
            this.setState({
              servizioFilter: e.target.value,
            });
            this.setState({
              filteredArray: this.filterServizioByStringValue(
                this.props.errors,
                e.target.value
              ),
            });
          }}
        /> */}

        <div className="contentAcc supportContent">
          <div className="userList">
            <div className="userList--AllUsers">
              <div className="header">
                <span>Data Ora</span>
                <span>Skin</span>
                <span>username</span>
                <span>utente</span>

                <span>Servizio</span>
                <span>Causale</span>
                <span className="deleteError">Delete</span>
              </div>
              {this.state.filteredArray
                ? this.state.filteredArray.map((error) => (
                    <SingleError
                      key={error.id}
                      deleteError={this.props.deleteError}
                      error={error}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const _ = (state) => {
  return {
    errors: state.auth.errors,
  };
};
export default connect(_, AuthActions)(SupportBody);
