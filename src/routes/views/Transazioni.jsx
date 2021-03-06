import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import "antd/dist/antd.css";
import moment from "moment";
import { Azioni, Header, Loader } from "shared-components";
import { slicedAmount } from "utils";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { isArray } from "lodash";
import CalendarRangePicker from "shared-components/CalendarRangePicker/CalendarRangePicker";
import ModalResponsiveForTables from "shared-components/ModalResponsiveForTables/ModalResponsiveForTables";
import ModalResPForTabMain from "shared-components/ModalResponsiveForTables/ModalResPForTabMain";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";
import { numberWithCommas } from "utils/HelperFunc";
import ModalRow from "shared-components/ModalResponsiveForTables/ModalRow";
import Excel from "./Excel";
import UseCode from "routes/views/UseCode";
//import ClickOut from "react-onclickout";
import Pdf from "./Pdf";
import { Form, Select, Tooltip, Pagination } from "antd";

const { Option } = Select;
class Transazioni extends React.Component {
  state = {
    dashboardFromFilterTop: true,
    selectedFilter: 3,
    visible: false,
    indexT: null,
    username: "",
    usernames: null,
    barcode: "",
    name: "",
    address: "",
    phone: "",
    from: "",
    to: "",
    modalDetails: "",
    fromLabel: "",
    toLabel: "",
    perPage: 25,
    showModalResponsive: false,
    picker: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        color: "var(--accent-bg)",
      },
    ],
    isCalendarOpen: false,
    //1 for movimenti , 2 for refills
    tableType: 1,
  };
  // (new Date()).setMonth(new Date().getMonth()-1)
  fromFilterTop = (val) => {
    this.setState({ dashboardFromFilterTop: val });
  };
  setCalendar = (val) => {
    this.setState({ isCalendarOpen: val });
  };
  showModal = (index, barcode, name, address, phone) => {
    this.setState({
      visible: true,
      indexT: index,
      barcode,
      name,
      address,
      phone,
    });
  };
  componentWillUnmount() {
    if (this.props.forAdmin === true) {
      this.props.openModalForAdmin(false);
      this.props.editModalDetails({});
    }
    this.props.setFromDateToDate(null);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let { usernames } = prevState;

    if (
      usernames === null &&
      nextProps.usernames &&
      nextProps.usernames.length > 0
    ) {
      usernames = nextProps.usernames;
      return { ...prevState, usernames };
    }

    return null;
  }
  activateModalForAdmin = (item, index) => {
    this.props.openModalForAdmin(true);
    this.props.editModalDetails({
      index,
      barcode: item.barcode,
      agency_name: item.agency_name,
      address: item.agency_address,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  componentDidUpdate(prevProps) {
    const { username, from, to, perPage } = this.state;
    const { activeSkinId } = this.props;
    if (
      this.props.activeSkinId !== prevProps.activeSkinId &&
      this.props.forAdmin
    ) {
      this.props.getPayments(
        username !== "" ? username : "",
        from || "",
        to || "",
        1,
        perPage ? perPage : 10,
        activeSkinId
      );
    }
    if (this.props.fromDate && this.props.fromDate !== prevProps.fromDate) {
      const label = moment(this.props.fromDate, "DD/MM/YYYY");

      this.setState({
        from: this.props.fromDate,
        to: this.props.fromDate,
        fromLabel: label,
        toLabel: label,
        perPage: 25,
      });
    }
  }

  handleCancel = (e) => {
    this.props.setPaymentsFromCode({});
    this.setState({
      visible: false,
    });
  };

  handleSubmit = async (e, refills) => {
    const { username, to, from, perPage } = this.state;
    e.preventDefault();
    if (refills) {
      await this.setState({ tableType: 2 });
      this.props.getRefills(1, perPage);
    } else {
      await this.setState({ tableType: 1 });
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.forAdmin
            ? this.props.getPayments(
                username,
                from || "",
                to || "",
                1,
                perPage,
                this.props.activeSkinId
              )
            : this.props.getPayments(
                username,
                from || "",
                to || "",
                1,
                perPage
              );
        }
      });
    }
  };

  changeSelected = (filter) => {
    const { username, perPage } = this.state;
    this.setState({ selectedFilter: filter });
    if (filter === 0) {
      const fromDate = moment().format("YYYY-MM-DD");
      this.setState({
        fromLabel: "",
        toLabel: "",
        from: fromDate,
        to: fromDate,
      });
      this.props.forAdmin
        ? this.props.getPayments(
            username !== "" ? username : "",
            fromDate,
            fromDate,
            1,
            perPage,
            this.props.activeSkinId
          )
        : this.props.getPayments(
            username !== "" ? username : "",
            fromDate,
            fromDate,
            1,
            perPage
          );
    }
    if (filter === 1) {
      const fromDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      const toDate = moment().subtract(1, "days").format("YYYY-MM-DD");

      this.setState({
        fromLabel: "",
        toLabel: "",
        from: fromDate,
        to: toDate,
      });
      this.props.forAdmin
        ? this.props.getPayments(
            username !== "" ? username : "",
            fromDate,
            fromDate,
            1,
            perPage,
            this.props.activeSkinId
          )
        : this.props.getPayments(
            username !== "" ? username : "",
            fromDate,
            toDate,
            1,
            perPage
          );
    }
    if (filter === 2) {
      const fromDate = moment()
        .subtract(7, "days")
        .startOf("day")
        .format("YYYY-MM-DD");
      const toDate = moment().format("YYYY-MM-DD");
      this.setState({
        fromLabel: "",
        toLabel: "",
        from: fromDate,
        to: toDate,
      });
      this.props.forAdmin
        ? this.props.getPayments(
            username !== "" ? username : "",
            fromDate,
            toDate,
            1,
            perPage,
            this.props.activeSkinId
          )
        : this.props.getPayments(
            username !== "" ? username : "",
            fromDate,
            toDate,
            1,
            perPage
          );
    }
    if (filter === 3) {
      this.setState({
        from: "",
        to: "",
        fromLabel: "",
        toLabel: "",
      });
      this.props.forAdmin
        ? this.props.getPayments(
            username !== "" ? username : "",
            "",
            "",
            1,
            perPage,
            this.props.activeSkinId
          )
        : this.props.getPayments(
            username !== "" ? username : "",
            "",
            "",
            1,
            perPage
          );
    }
  };

  handleSearch = (value) => {
    const { usernames } = this.props;
    if (value && usernames) {
      let res = usernames.filter((user) =>
        user.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      this.setState({ usernames: res });
    } else {
      this.setState({ usernames: [] });
    }
  };

  handleChange = (value) => {
    this.setState({ username: value });
  };
  componentDidMount() {
    const { username } = this.state;

    this.props.forAdmin
      ? this.props.getPayments(
          username !== "" ? username : "",
          "",
          "",
          1,
          25,
          this.props.activeSkinId
        )
      : this.props.getPayments(username !== "" ? username : "", "", "", 1, 25);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { forAdmin, paymentsForExcel, screenWidth } = this.props;
    const {
      // barcode,
      picker,
      isCalendarOpen,
      fromLabel,
      toLabel,
      to,
      from,
      username,
      perPage,
      // visible,
      modalDetails,
      tableType,
    } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const {
      payments,
      accountInfo,
      loadingPayments,
      // paymentsFromCode,
      paymentsPages,
      navbarSearch,
      getCodiceTicket,
      // skinExtras,
      getPayments,
    } = this.props;
    const filters = [
      { name: "Oggi", color: "#707070" },
      { name: "Ieri", color: "#0078f" },
      { name: "Queste Sett", color: "#00b850" },
      { name: "Queste Mese", color: "#e30000" },
    ];

    const paymentsO =
      payments &&
      isArray(payments) &&
      payments.sort(function (a, b) {
        return new Date(b.executed_date) - new Date(a.executed_date);
      });
    return (
      <div
        className={`${forAdmin === true ? "" : "Container"}`}
        style={
          forAdmin === true
            ? { background: "transparent", width: "100%", height: "0px" }
            : { width: "auto" }
        }
      >
        {this.props.forAdmin === true ? null : (
          <React.Fragment>
            <Header></Header>
          </React.Fragment>
        )}
        {this.state.showModalResponsive === true &&
          this.props.screenWidth <= 1024 &&
          forAdmin && (
            <ModalResponsiveForTables
              Close={(e) => {
                this.setState({
                  modalDetails: "",
                  showModalResponsive: false,
                });
              }}
              Header={
                <React.Fragment>
                  <i className="fal fa-user-alt" aria-hidden="true"></i>
                  <span>{modalDetails.agency_name}</span>
                </React.Fragment>
              }
              beforeFooter={null}
              Footer={null}
              Rows={
                <React.Fragment>
                  <div className="ServiceRow">
                    <ModalRow
                      title="Service"
                      data={modalDetails.service_name}
                    />
                  </div>
                  <div className="DateOraRow">
                    <ModalRow
                      title="Date Ora"
                      data={moment(modalDetails.executed_date).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                    />
                  </div>
                  <div className="OtherRow">
                    <ModalRow
                      title="Barcode"
                      data={modalDetails.barcode}
                      handleClick={() => {
                        getCodiceTicket(
                          modalDetails.barcode,
                          modalDetails.service_name
                        );
                        this.showModal(
                          this.state.index,
                          modalDetails.barcode,
                          modalDetails.agency_name,
                          modalDetails.agency_address,
                          modalDetails.agency_phone
                        );
                      }}
                    />
                    <ModalRow title="User" data={modalDetails.agency_name} />
                    <ModalRow
                      title="Importo"
                      data={numberWithCommas(modalDetails.price1000 / 1000)}
                    />
                    <ModalRow
                      title="Commissione"
                      data={modalDetails.commissione}
                    />
                    <ModalRow
                      title="Proviggione"
                      data={modalDetails.percentage}
                    />
                    <ModalRow title="Saldo" data={modalDetails.saldo} />
                  </div>
                </React.Fragment>
              }
            />
          )}
        {this.state.showModalResponsive === true &&
          this.props.screenWidth <= 800 &&
          !forAdmin && (
            <ModalResPForTabMain
              Close={(e) => {
                this.setState({
                  modalDetails: "",
                  showModalResponsive: false,
                });
              }}
              mobilePopUpData={modalDetails}
              exception={"sign"}
            />
          )}
        <div className="container-fluid overview ">
          {!forAdmin && (
            <Azioni activeMain="contabilita" active="transazioni"></Azioni>
          )}

          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni max-width border-0">
              {isCalendarOpen && (
                <CalendarRangePicker
                  setStateFunc={(item) => {
                    this.setState({
                      picker: [item.selection],
                      from: moment(item.selection.startDate).format(
                        "YYYY-MM-DD"
                      ),
                      to: moment(item.selection.endDate).format("YYYY-MM-DD"),
                      fromLabel: moment(item.selection.startDate).format(
                        "DD/MM/YYYY"
                      ),
                      toLabel: moment(item.selection.endDate).format(
                        "DD/MM/YYYY"
                      ),
                    });
                  }}
                  setStateFuncEmpty={() => {
                    this.setState({
                      from: "",
                      to: "",
                      fromLabel: "",
                      toLabel: "",
                    });
                  }}
                  picker={picker}
                  setCalendar={this.setCalendar}
                  handleSubmit={this.handleSubmit}
                />
              )}
              <div className="MoviFirst">
                <h1 className="heading-tab">Lista Movimenti</h1>
                <div className="DateUtent">
                  <div className="datepics ml-auto mr-2">
                    <Form
                      {...formItemLayout}
                      onSubmit={this.handleSubmit}
                      className="filters"
                    >
                      {
                        <div className="dal">
                          {
                            <Form.Item>
                              {getFieldDecorator(
                                "username",
                                {}
                              )(
                                // <Select
                                //   value={this.state.username}
                                //   onChange={this.handleCurrencyChange}
                                // >
                                //   <Option value="rmb">RMB</Option>
                                //   <Option value="dollar">Dollar</Option>
                                // </Select>

                                <Select
                                  showSearch
                                  defaultActiveFirstOption={false}
                                  showArrow={false}
                                  filterOption={true}
                                  onSearch={this.handleSearch}
                                  onChange={this.handleChange}
                                  // notFoundContent={null}
                                  placeholder={"Cerca Utente"}
                                >
                                  {this.props.usernames &&
                                    this.props.usernames.length > 0 &&
                                    this.props.usernames.map((user) => (
                                      <Option key={user}>{user}</Option>
                                    ))}
                                </Select>
                              )}
                            </Form.Item>
                          }
                          <i className="fal fa-search"></i>
                        </div>
                      }

                      <div
                        className="dal calendar"
                        type="text"
                        onClick={() => {
                          this.setCalendar(true);
                        }}
                      >
                        <span>
                          {fromLabel
                            ? `${fromLabel} - ${toLabel}`
                            : "Seleziona la data"}
                          <i className="fal fa-calendar-alt"></i>
                        </span>
                      </div>
                    </Form>

                    <div className="codice"></div>
                  </div>
                  <Select
                    defaultValue="3"
                    className="SlectDate"
                    onChange={(value) => {
                      this.changeSelected(parseInt(value));
                      this.fromFilterTop(false);
                    }}
                  >
                    {filters.map((item, index) => {
                      return (
                        <Option
                          value={index.toString()}
                          key={(item.name + index).toString()}
                        >
                          <span
                            style={{
                              width: "100%",
                              height: "100%",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {forAdmin ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                style={{
                                  marginRight: "15px",
                                }}
                              >
                                <g className="a">
                                  <circle
                                    className="b"
                                    cx="7"
                                    cy="7"
                                    r="7"
                                    style={{
                                      fill: `${item.color}`,
                                    }}
                                  />
                                  <circle
                                    className="c"
                                    cx="7"
                                    cy="7"
                                    r="4"
                                    style={{ fill: "#ffffff" }}
                                  />
                                </g>
                              </svg>
                            ) : (
                              <i
                                className="fas fa-dot-circle"
                                style={{
                                  color: `${item.color}`,
                                  paddingRight: "12px",
                                  fontSize: "13px",
                                }}
                              ></i>
                            )}
                            {item.name}
                          </span>
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                {!this.props.forAdmin ? (
                  screenWidth > 1024 && (
                    <button
                      className={
                        "filterBtn" + (tableType === 1 ? " active" : "")
                      }
                      htmltype="submit"
                      onClick={this.handleSubmit}
                    >
                      Filter
                    </button>
                  )
                ) : (
                  <>
                    <button
                      className={
                        "filterBtn" + (tableType === 1 ? " active" : "")
                      }
                      htmltype="submit"
                      onClick={(e) => {
                        this.handleSubmit(e);
                      }}
                    >
                      <i className="fas fa-filter"></i>
                      Filter
                    </button>
                    {accountInfo.profile.role.name === "main_admin" && (
                      <button
                        className={
                          "filterBtn" + (tableType === 2 ? " active" : "")
                        }
                        htmltype="submit"
                        onClick={(e) => {
                          this.handleSubmit(e, true);
                        }}
                      >
                        <i className="fad fa-coins"></i>
                        ENTRATE
                      </button>
                    )}
                  </>
                )}
              </div>
              {!this.props.forAdmin ? (
                <React.Fragment>
                  <div className="barCodeExport">
                    <button
                      onClick={() => this.setState({ hasVPT: true })}
                      className="barcodeBtn"
                    >
                      {screenWidth >= 550 ? "ricerca movimenti" : ""}{" "}
                      <i className="fal fa-barcode-read"></i>
                    </button>
                    <div className="filesBtns">
                      <Pdf
                        paymentExcelLoading={this.props.paymentExcelLoading}
                        username={username}
                        from={from}
                        to={to}
                        perPage={perPage}
                        payments={paymentsForExcel}
                        getPaymentsForExcel={this.props.getPaymentsForExcel}
                      />
                      <Excel
                        username={username}
                        from={from}
                        to={to}
                        perPage={perPage}
                        payments={paymentsForExcel}
                      />
                    </div>
                  </div>
                  {!forAdmin && screenWidth < 1024 && (
                    <button
                      className={
                        "filterBtn" + (tableType === 1 ? " active" : "")
                      }
                      htmltype="submit"
                      onClick={this.handleSubmit}
                    >
                      Filter
                    </button>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="barCodeExport">
                    <button
                      onClick={() => this.setState({ hasVPT: true })}
                      className="barcodeBtn"
                    >
                      {screenWidth >= 550 ? "ricerca movimenti" : ""}{" "}
                      <i className="fal fa-barcode-read"></i>
                    </button>
                    <div className="filesBtns">
                      <Pdf
                        paymentExcelLoading={this.props.paymentExcelLoading}
                        username={username}
                        from={from}
                        to={to}
                        perPage={perPage}
                        payments={paymentsForExcel}
                        getPaymentsForExcel={this.props.getPaymentsForExcel}
                      />
                      <Excel
                        username={username}
                        from={from}
                        to={to}
                        perPage={perPage}
                        payments={paymentsForExcel}
                      />
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                {payments?.message && (
                  <div className="alert alert-danger text-center">
                    {payments?.message}
                  </div>
                )}

                {loadingPayments &&
                  (forAdmin ? <div className="loaderAdmin"></div> : <Loader />)}
                {!loadingPayments && (
                  <table
                    className={
                      "transTable Movimenti" +
                      (tableType === 2 ? " refills" : "")
                    }
                  >
                    <thead>
                      <tr>
                        <td className="wsNwp">Date / Ora</td>
                        <td className="wsNwp">Barcode</td>
                        <td className="wsNwp">Utente</td>
                        <td className="wsNwp servizoTd">Servizio</td>
                        <td className="wsNwp right">Importo</td>
                        <td className="wsNwp right">Commissione</td>
                        {accountInfo.profile.role.name !== "user" && (
                          <td className=" wsNwp right">Proviggione</td>
                        )}

                        <td className=" wsNwp right">Saldo</td>
                        {this.props.screenWidth <= 865 && forAdmin && <td></td>}

                        {this.props.screenWidth <= 1024 && forAdmin ? (
                          <td className="wsNwp"></td>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {!payments?.message &&
                      (paymentsO || []) &&
                      paymentsO?.length === 0 ? (
                        <tr className="NoData">
                          <td colSpan="8">
                            {" "}
                            <i className="fal fa-info-circle"></i>
                            <span>No Data</span>
                          </td>
                        </tr>
                      ) : (
                        (paymentsO || []).map((item, index) => {
                          return (
                            (
                              item.service_name &&
                              item.service_name.toString().toLowerCase()
                            ).includes(navbarSearch.toLowerCase()) && (
                              <tr
                                key={index}
                                onClick={(e) => {
                                  if ([...e.target.classList].includes("bc")) {
                                    getCodiceTicket(
                                      item.barcode,
                                      item.service_name
                                    );
                                  }
                                  if (e.target.tagName !== "I") {
                                    if (
                                      forAdmin &&
                                      this.props.screenWidth <= 402 &&
                                      ![...e.target.classList].includes("bc")
                                    ) {
                                      this.setState({
                                        showModalResponsive: true,
                                        modalDetails: item,
                                      });
                                    } else if (
                                      !forAdmin &&
                                      this.props.screenWidth <= 800 &&
                                      ![...e.target.classList].includes("bc")
                                    ) {
                                      this.setState({
                                        showModalResponsive: true,
                                        modalDetails: item,
                                      });
                                    }
                                    forAdmin &&
                                    this.props.screenWidth > 1320 &&
                                    [...e.target.classList].includes("bc")
                                      ? this.activateModalForAdmin(item, index)
                                      : [...e.target.classList].includes(
                                          "bc"
                                        ) &&
                                        this.showModal(
                                          index,
                                          item.barcode,
                                          item.agency_name,
                                          item.agency_address,
                                          item.agency_phone
                                        );
                                  }
                                }}
                              >
                                <td className="wsNwp">
                                  {moment(item.executed_date).format(
                                    "DD/MM/YYYY HH:mm:ss"
                                  )}
                                </td>
                                <td className="wsNwp">
                                  <div className="bc">{item.barcode}</div>
                                </td>
                                {screenWidth <= 550 ? (
                                  <td className="wsNwp">
                                    <div>{item.agency_name}</div>
                                    <div>{item.service_name}</div>
                                  </td>
                                ) : (
                                  <td className="wsNwp">
                                    {" "}
                                    <i
                                      className={`fal fa-${
                                        item.user_role === "agency"
                                          ? "store"
                                          : "user-alt"
                                      }`}
                                      aria-hidden="true"
                                    ></i>{" "}
                                    <Tooltip title={item.agency_name}>
                                      <SpanFormater
                                        myClassName="nomeTd"
                                        Word={item.agency_name}
                                        size={35}
                                        nrOfRows={1}
                                        formatWord={true}
                                      />
                                    </Tooltip>
                                  </td>
                                )}

                                <td className="wsNwp servizoTd">
                                  {item.service_name}
                                </td>

                                <td className="wsNwp right importoTd">
                                  <i
                                    className={`fal fa-${
                                      item.sign === "-" ? "minus" : "plus"
                                    }-circle fa-sm`}
                                    style={{
                                      color:
                                        item.sign === "-"
                                          ? "#ff0000"
                                          : "#0da90f",
                                    }}
                                  />
                                  <span>
                                    {numberWithCommas(
                                      item.price1000
                                        ? slicedAmount(item.price1000 / 1000)
                                        : "-"
                                    )}
                                    ???
                                  </span>
                                </td>
                                <td className="wsNwp right">
                                  {item.commissione}???
                                  {/* {item.commissione ? item.commissione : "-"}{" "} */}
                                </td>
                                {accountInfo.profile.role.name !== "user" && (
                                  <td className="wsNwp right">
                                    {item.percentage}???
                                    {/* {parseInt(item.percentage) > 0
                                ? item.percentage
                                : "-"} */}
                                  </td>
                                )}

                                <td className="wsNwp right">
                                  {item.saldo !== "-" ? item.saldo + "???" : "-"}
                                </td>
                                {this.props.screenWidth <= 865 && forAdmin && (
                                  <td
                                    className="wsNwp"
                                    style={{ textAlign: "center" }}
                                    onClick={() => {
                                      this.setState({
                                        showModalResponsive: true,
                                        modalDetails: item,
                                        index: index,
                                      });
                                    }}
                                  >
                                    <i className="fal fa-eye"></i>
                                  </td>
                                )}
                              </tr>
                            )
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="paginationWrapper">
                <Pagination
                  onChange={(e) => {
                    // console.log("ca ka pagination", e);
                    if (tableType === 1) {
                      forAdmin
                        ? this.props.getPayments(
                            username !== "" ? username : "",
                            from || "",
                            to || "",
                            e,
                            perPage,
                            this.props.activeSkinId
                          )
                        : getPayments(
                            username !== "" ? username : "",
                            from || "",
                            to || "",
                            e,
                            perPage
                          );
                    } else {
                      this.props.getRefills(e, perPage);
                    }
                  }}
                  total={
                    Object.keys(paymentsPages).length === 0
                      ? 1
                      : paymentsPages.total_pages * 10
                  }
                />
                <Select
                  defaultValue={25}
                  onChange={(e) => {
                    this.setState({ perPage: parseInt(e) });
                    if (tableType === 1) {
                      forAdmin
                        ? getPayments(
                            username !== "" ? username : "",
                            from || "",
                            to || "",
                            1,
                            e,
                            this.props.activeSkinId
                          )
                        : getPayments(
                            username !== "" ? username : "",
                            from || "",
                            to || "",
                            1,
                            e
                          );
                    } else {
                      this.props.getRefills(1, e);
                    }
                  }}
                >
                  <Option value={10}>10 / Pagina</Option>
                  <Option value={25}>25 / Pagina</Option>
                  <Option value={50}>50 / Pagina</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>
        {this.state.hasVPT && (
          <div
            className="backDrop"
            onClick={() => {
              this.setState({ hasVPT: false });
            }}
          >
            <UseCode
              paymentsO={paymentsO}
              getCodiceTicket={getCodiceTicket}
              showModal={this.showModal}
            />
          </div>
        )}
      </div>
    );
  }
}

const TransazioniF = Form.create({ name: "Transazioni" })(Transazioni);

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service_id: state.auth.service_id,
  payments: state.auth.payments,
  loadingPayments: state.auth.loadingPayments,
  usernames: state.auth.usernames,
  accountInfo: state.auth.accountInfo,
  navbarSearch: state.main.navbarSearch,
  skinExtras: state.auth.skinExtras,
  paymentsFromCode: state.auth.paymentsFromCode,
  paymentsPages: state.auth.paymentsPages,
  screenWidth: state.main.screenWidth,
  paymentsForExcel: state.auth.paymentsForExcel,
  paymentExcelLoading: state.auth.paymentExcelLoading,
  fromDate: state.auth.fromDate,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  TransazioniF
);
