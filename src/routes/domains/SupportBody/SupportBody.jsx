import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import SingleError from "./SingleError";
import "./style.css";
import { Select, Pagination } from "antd";
const { Option } = Select;
export class SupportBody extends Component {
  state = {
    filteredArray: null,
    skinFilter: "",
    userNameFilter: "",
    utenteFilter: "",
    servizioFilter: "",
    perPage: 25,
    page_number: 1,
    current_page: 1,
  };
  componentDidMount() {
    this.props.getErrors(25, 1);
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
      const errorDate = new Date(error.full_time).getTime();
      const startDateFilter = new Date(startDate).getTime();
      const endDateFilter = new Date(endDate).getTime();
      return errorDate <= endDateFilter && startDateFilter >= errorDate;
    });
    return result;
  };
  componentDidUpdate() {
    if (
      this.state.filteredArray == null &&
      this.props.errors &&
      Array.isArray(this.props.errors) &&
      this.props.errors.length >= 1
    ) {
      this.setState({ filteredArray: this.props.errors });
    }
  }
  render() {
    const { perPage, page_number, current_page } = this.state;
    const {
      deleteError,
      total_pages,
      getErrors,
      errors,
      ErrLoading,
    } = this.props;
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
        {!ErrLoading ? (
          <React.Fragment>
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
                  {errors
                    ? errors.map((error) => (
                        <SingleError
                          key={error.id}
                          deleteError={deleteError}
                          error={error}
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="loaderAdmin">Loading...</div>
        )}{" "}
        <div className="paginationWrapper">
          <Pagination
            onChange={(e) => {
              getErrors(perPage, e);
              this.setState({
                current_page: e,
              });
            }}
            total={total_pages ? total_pages * 10 : 10}
            current={current_page}
          />
          <Select
            defaultValue={25}
            onChange={(e) => {
              this.setState({ perPage: parseInt(e), clickedPage: 1 }, () => {
                getErrors(e, page_number);
              });
            }}
            value={perPage}
          >
            <Option value={10}>10 / Pagina</Option>
            <Option value={25}>25 / Pagina</Option>
            <Option value={50}>50 / Pagina</Option>
          </Select>
        </div>
      </div>
    );
  }
}
const _ = (state) => {
  return {
    errors: state.auth.errors.errors,
    total_pages: state.auth.errors.total_pages,
    ErrLoading: state.auth.ErrLoading,
  };
};
export default connect(_, AuthActions)(SupportBody);
