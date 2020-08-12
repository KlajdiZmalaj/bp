import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { Form, Modal, Select, Tooltip, Pagination } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { get } from "lodash";
import { Azioni, Overview, Header } from "shared-components";
import { slicedAmount } from "utils";
import ReactToPrint from "react-to-print";
import images from "themes/images";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { isArray } from "lodash";
import CalendarRangePicker from "shared-components/CalendarRangePicker/CalendarRangePicker";
import ModalResponsiveForTables from "shared-components/ModalResponsiveForTables/ModalResponsiveForTables";
import ModalRow from "shared-components/ModalResponsiveForTables/ModalRow";
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
    perPage: 10,
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

  handleCancel = (e) => {
    this.props.setPaymentsFromCode({});
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e) => {
    const { username, to, from, perPage } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.getPayments(username, from || "", to || "", 1, perPage);
      }
    });
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
      this.props.getPayments(
        username != "" ? username : "",
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
      this.props.getPayments(
        username != "" ? username : "",
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

      this.props.getPayments(
        username != "" ? username : "",
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
      this.props.getPayments(
        username != "" ? username : "",
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
    // console.log(
    //   "moment",
    //   moment().format("D"),
    //   moment().format(),
    //   ">>>",
    //   moment()
    //     .subtract(parseInt(moment().format("D")), "days")
    //     .format()
    // );
    const { username } = this.state;
    this.props.getPayments(username != "" ? username : "", "", "", 1, 10);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { forAdmin } = this.props;
    const {
      barcode,
      picker,
      selectedFilter,
      indexT,
      usernames,
      isCalendarOpen,
      dashboardFromFilterTop,
      fromLabel,
      toLabel,
      to,
      from,
      username,
      perPage,
      visible,
      address,
      name,
      modalDetails,
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
      paymentsFromCode,
      paymentsPages,
      navbarSearch,
      getCodiceTicket,
      skinExtras,
      getPayments,
    } = this.props;
    // console.log("paymentspayments", payments);

    const filters = ["oggi", "ieri", "questa sett", "queste mese"];

    let options = [];

    if (usernames && usernames.length > 0) {
      options = usernames.map((user) => <Option key={user}>{user}</Option>);
    }
    // console.log("skinExtrasskinExtras", this.props.skinExtras);
    const paymentsO =
      payments &&
      isArray(payments) &&
      payments.sort(function (a, b) {
        return new Date(b.executed_date) - new Date(a.executed_date);
      });
    return (
      <div
        className={`${forAdmin === true ? "" : "Container"}`}
        style={forAdmin === true ? { width: "100%" } : { width: "auto" }}
      >
        {this.props.forAdmin === true ? null : (
          <React.Fragment>
            <Header></Header>
            <Overview
              fromFilterTop={this.fromFilterTop}
              dashboardFromFilterTop={dashboardFromFilterTop}
            ></Overview>
          </React.Fragment>
        )}
        {this.state.showModalResponsive === true &&
        this.props.screenWidth <= 1050 ? (
          <ModalResponsiveForTables
            Close={(e) => {
              this.setState({
                modalDetails: "",
                showModalResponsive: false,
              });
            }}
            Rows={
              <React.Fragment>
                <ModalRow
                  title="Date Ora"
                  data={moment(modalDetails.executed_date).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                />
                <ModalRow title="Barcode" data={modalDetails.barcode} />
                <ModalRow title="User" data={modalDetails.agency_name} />
                <ModalRow title="Service" data={modalDetails.service_name} />
                <ModalRow title="Importo" data={modalDetails.price1000} />
                <ModalRow title="Commissione" data={modalDetails.commissione} />
                <ModalRow title="Proviggione" data={modalDetails.percentage} />
                <ModalRow title="Saldo" data={modalDetails.saldo} />{" "}
              </React.Fragment>
            }
          />
        ) : null}
        <div className="container-fluid overview ">
          {!forAdmin && <Azioni active="transazioni"></Azioni>}

          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni max-width border-0">
              {isCalendarOpen && (
                <CalendarRangePicker
                  setStateFunc={(item) => {
                    this.setState({
                      picker: [item.selection],
                      from: format(item.selection.startDate, "yyyy-MM-dd"),
                      to: format(item.selection.endDate, "yyyy-MM-dd"),
                      fromLabel: format(item.selection.startDate, "dd/MM/yyyy"),
                      toLabel: format(item.selection.endDate, "dd/MM/yyyy"),
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
                  handleSubmit={this.handleSubmi}
                />
              )}
              <h1 className="heading-tab ">Lista Movimenti</h1>
              <div className="datepics ml-auto mr-2">
                <Form
                  {...formItemLayout}
                  onSubmit={this.handleSubmit}
                  className="filters"
                >
                  {(get(accountInfo, "profile.role.name") === "super_admin" ||
                    get(accountInfo, "profile.role.name") === "agent") && (
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
                              filterOption={false}
                              onSearch={this.handleSearch}
                              onChange={this.handleChange}
                              // notFoundContent={null}
                              placeholder={
                                this.props.usernames.length > 0
                                  ? this.props.usernames[0]
                                  : "Select"
                              }
                            >
                              {options}
                            </Select>
                          )}
                        </Form.Item>
                      }
                    </div>
                  )}

                  <div
                    className="dal calendar"
                    type="text"
                    onClick={() => {
                      this.setCalendar(true);
                    }}
                  >
                    {fromLabel
                      ? `${fromLabel} - ${toLabel}`
                      : "Seleziona la data"}
                  </div>
                  {!this.props.forAdmin && (
                    <div>
                      <button className="filterBtn" htmltype="submit">
                        Filter
                      </button>
                    </div>
                  )}
                </Form>

                <div className="codice"></div>
              </div>
              <ul className="m-0 p-0">
                {filters.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={index === selectedFilter ? "active" : ""}
                      onClick={() => {
                        this.changeSelected(index);
                        this.fromFilterTop(false);
                      }}
                    >
                      {forAdmin ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                        >
                          <g className="a">
                            <circle className="b" cx="7" cy="7" r="7" />
                            <circle className="c" cx="7" cy="7" r="4" />
                          </g>
                        </svg>
                      ) : (
                        <i className="fas fa-dot-circle"></i>
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
              {forAdmin && (
                <button
                  className="filterBtn"
                  htmltype="submit"
                  onClick={this.handleSubmit}
                >
                  <i className="fas fa-filter"></i>
                  Filter
                </button>
              )}
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                {payments.message && (
                  <div className="alert alert-danger text-center">
                    {payments.message}
                  </div>
                )}
                {loadingPayments && (
                  <img className="loader" src={images.loader}></img>
                )}
                {!loadingPayments && (
                  <table className="transTable">
                    <thead>
                      <tr>
                        <td className="wsNwp">Date / Ora</td>
                        <td className="wsNwp">Barcode</td>
                        <td className="wsNwp">User</td>
                        <td className="wsNwp servizoTd">Service</td>
                        <td className="wsNwp right">Importo</td>
                        <td className="wsNwp right">Commissione</td>
                        <td className=" wsNwp right">Proviggione</td>
                        <td className=" wsNwp right">Saldo</td>
                        {this.props.screenWidth <= 1050 && forAdmin ? (
                          <td className="wsNwp"></td>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {!payments.message &&
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
                                  if (e.target.tagName != "I") {
                                    if (
                                      this.props.screenWidth <= 402 &&
                                      ![...e.target.classList].includes("bc")
                                    ) {
                                      this.setState({
                                        showModalResponsive: true,
                                        modalDetails: item,
                                      });
                                    }
                                    forAdmin &&
                                    this.props.screenWidth >= 1050 &&
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
                                <td className="wsNwp">
                                  {" "}
                                  <i
                                    className="fal fa-user-alt"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  <Tooltip title={item.agency_name}>
                                    <span className="nomeTd">
                                      {item.agency_name}
                                    </span>
                                  </Tooltip>
                                </td>
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
                                  {item.price1000
                                    ? slicedAmount(item.price1000 / 1000)
                                    : "-"}
                                  €
                                </td>
                                <td className="wsNwp right">
                                  {item.commissione}€
                                  {/* {item.commissione ? item.commissione : "-"}{" "} */}
                                </td>
                                <td className="wsNwp right">
                                  {item.percentage}€
                                  {/* {parseInt(item.percentage) > 0
                                ? item.percentage
                                : "-"} */}
                                </td>
                                <td className="wsNwp right">
                                  {item.saldo !== "-" ? item.saldo + "€" : "-"}
                                </td>
                                {this.props.screenWidth <= 1050 && forAdmin && (
                                  <td
                                    className=" wsNwp right"
                                    onClick={() => {
                                      this.setState({
                                        showModalResponsive: true,
                                        modalDetails: item,
                                      });
                                    }}
                                  >
                                    <i className="fal fa-search-plus"></i>
                                  </td>
                                )}
                              </tr>
                            )
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="paginationWrapper">
                <Pagination
                  onChange={(e) => {
                    // console.log("ca ka pagination", e);
                    getPayments(
                      username != "" ? username : "",
                      from || "",
                      to || "",
                      e,
                      perPage
                    );
                  }}
                  total={
                    Object.keys(paymentsPages).length === 0
                      ? 1
                      : paymentsPages.total_pages * 10
                  }
                />
                <Select
                  defaultValue="10"
                  onChange={(e) => {
                    this.setState({ perPage: parseInt(e) });
                    getPayments(
                      username != "" ? username : "",
                      from || "",
                      to || "",
                      1,
                      e
                    );
                  }}
                >
                  <Option value={10}>10 / Pagina</Option>
                  <Option value={25}>25 / Pagina</Option>
                  <Option value={50}>50 / Pagina</Option>
                </Select>
              </div>
            </div>
          </div>
          <Modal
            title={null}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            {indexT !== null && payments[indexT] && (
              <div
                className="printModal"
                ref={(el) => (this.componentRef = el)}
              >
                <div className="headerModal">
                  <img className="logo" src={images.logo} alt="" />
                  <span className="superSmall text-bold">
                    MAPE <span>di Hristova Mariya Hristova e C.s.a.s.</span>
                  </span>
                  <span className="superSmall">{skinExtras.address}</span>
                  <span className="superSmall link">{skinExtras.email}</span>
                  <span className="superSmall ">Tel: {skinExtras.cel}</span>
                  <span className="superSmall tel">P.IVA 03852290406</span>

                  {/* <span>BPOINT</span> */}

                  <span className="fontSmall text-bold">
                    {name.charAt(0).toUpperCase() +
                      name.slice(1).toLocaleLowerCase()}
                  </span>
                  <span className="fontSmall address">
                    {address.charAt(0).toUpperCase() +
                      address.slice(1).toLocaleLowerCase()}
                  </span>
                  {/* <span className="userCel">
                    {" "}
                    Telefono: <b>{this.state.phone}</b>{" "}
                  </span> */}
                  {/* BPOINT<br></br>
                  PUNTA ANCORA DI GALASSI GABRIELE<br></br>
                  VIA DEL LAVORO, 29 - IMOLA<br></br>
                  Telefono: 335398618<br></br> */}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      paymentsFromCode &&
                      paymentsFromCode.receipt &&
                      paymentsFromCode.receipt
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/\t/g, "\u00a0")
                        .replace(/\n/g, "<br/> ")
                        .replace(/\+/g, " ")
                        .replace(/: /g, ":<div class='marginB'></div>")
                        .replace(
                          /<div class='marginB'><\/div>([^>]+)<br\/>/g,
                          "<div class='marginB'></div><div class='marginC'>$1</div><br/>"
                        ),
                  }}
                />

                <img
                  className="barcodeModal"
                  src={`https://barcode.tec-it.com/barcode.ashx?data=${barcode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
                  alt=""
                />
                <ReactToPrint
                  trigger={() => <div className="printBtn">Print</div>}
                  content={() => this.componentRef}
                  bodyClass="afterprint"
                  // copyStyles="false"
                />
              </div>
            )}
          </Modal>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>
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
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  TransazioniF
);
