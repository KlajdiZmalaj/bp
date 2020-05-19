import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

import { Form, DatePicker, Modal, Select } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { get } from "lodash";
// import sortBy from "lodash/sortBy";
import { Azioni, Overview, Header } from "shared-components";
import { slicedAmount } from "utils";
import ReactToPrint from "react-to-print";
import images from "themes/images";

import { DateRangePicker } from "react-date-range";
import { subDays, format } from "date-fns";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { isArray } from "lodash";
const renderStaticRangeLabel = (e) => (
  <CustomStaticRangeLabelContent text={e} />
);
class CustomStaticRangeLabelContent extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <span>
        <i>{text}</i>
      </span>
    );
  }
}
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

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.getPayments(
          this.state.username,
          this.state.from || moment().subtract(30, "days").format("YYYY-MM-DD"),
          this.state.to || moment().format("YYYY-MM-DD")
        );
      }
    });
  };

  changeSelected = (filter) => {
    this.setState({ selectedFilter: filter });
    if (filter === 0) {
      this.props.getPayments("", moment(), moment());
    }
    if (filter === 1) {
      this.props.getPayments(
        "",
        moment().subtract(1, "days").format("YYYY-MM-DD"),
        moment().subtract(1, "days").format("YYYY-MM-DD")
      );
    }
    if (filter === 2) {
      const time7daysAgo = moment().subtract(7, "days").startOf("day");
      this.props.getPayments("", time7daysAgo, moment());
    }
    if (filter === 3) {
      const time30daysAgo = moment().subtract(30, "days").startOf("day");
      this.props.getPayments("", time30daysAgo, moment());
      // this.props.getPayments();
    }
  };

  handleSearch = (value) => {
    if (value && this.props.usernames) {
      let res = this.props.usernames.filter((user) => user.includes(value));
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
    this.props.getPayments(
      "",

      moment()
        .subtract(parseInt(moment().format("D")), "days")
        .format(),
      moment().format()
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { barcode } = this.state;
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
    const { payments, accountInfo } = this.props;
    const { selectedFilter, indexT, usernames } = this.state;

    const filters = ["oggi", "ieri", "questa sett", "queste mese"];

    let options = [];

    if (usernames && usernames.length > 0) {
      options = usernames.map((user) => <Option key={user}>{user}</Option>);
    }
    console.log("payments", payments);
    const paymentsO =
      payments &&
      isArray(payments) &&
      payments.sort(function (a, b) {
        return new Date(b.executed_date) - new Date(a.executed_date);
      });

    return (
      <div>
        <Header></Header>
        <Overview
          fromFilterTop={this.fromFilterTop}
          dashboardFromFilterTop={this.state.dashboardFromFilterTop}
        ></Overview>
        <div className="container-fluid overview ">
          <Azioni active="transazioni"></Azioni>

          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni max-width border-0">
              {this.state.isCalendarOpen && (
                <div className="calendarWrapper">
                  <DateRangePicker
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onChange={(item) => {
                      console.log(
                        "itemm",
                        item,
                        item.selection.startDate,
                        format(item.selection.startDate, "yyyy-MM-dd")
                      );
                      this.setState({
                        picker: [item.selection],
                        from: format(item.selection.startDate, "yyyy-MM-dd"),
                        to: format(item.selection.endDate, "yyyy-MM-dd"),
                      });
                    }}
                    locale={locales["it"]}
                    color="#00e2b6"
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={this.state.picker}
                    direction="horizontal"
                    renderStaticRangeLabel={(e) => {
                      return renderStaticRangeLabel(e.label);
                    }}
                    staticRanges={[
                      {
                        label: "Oggi",
                        hasCustomRendering: true,
                        range: () => ({
                          endDate: new Date(),
                          startDate: new Date(),
                        }),
                        isSelected() {
                          return false;
                        },
                      },
                      {
                        label: "Ultima settimana",
                        hasCustomRendering: true,
                        range: () => ({
                          endDate: new Date(),
                          startDate: subDays(new Date(), 6),
                        }),
                        isSelected() {
                          return false;
                        },
                      },
                      {
                        label: "Ultimo mese",
                        hasCustomRendering: true,
                        range: () => ({
                          endDate: new Date(),
                          startDate: subDays(new Date(), 29),
                        }),
                        isSelected() {
                          return false;
                        },
                      },
                      {
                        label: "Ultima 3 mesi",
                        hasCustomRendering: true,
                        range: () => ({
                          endDate: new Date(),
                          startDate: subDays(new Date(), 89),
                        }),
                        isSelected() {
                          return false;
                        },
                      },
                    ]}
                    // scroll={{ enabled: true }}
                  />
                  <div
                    className="blurCalendar"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.setCalendar(false);
                    }}
                  ></div>
                  {
                    <div className="buttons">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.setCalendar(false);
                          this.setState({ from: "", to: "" });
                        }}
                      >
                        Cancella
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.setCalendar(false);
                          this.handleSubmit(e);
                        }}
                      >
                        Esegui
                      </button>
                    </div>
                  }
                </div>
              )}
              <h1 className="heading-tab ">Lista Movimenti</h1>
              <div className="datepics ml-auto mr-2">
                <Form
                  {...formItemLayout}
                  onSubmit={this.handleSubmit}
                  className="filters"
                >
                  {get(accountInfo, "profile.role.name") === "super_admin" && (
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
                    {this.state.from
                      ? `${this.state.from} - ${this.state.to}`
                      : "Seleziona la data"}
                  </div>
                  <div>
                    <button className="filterBtn" htmltype="submit">
                      Filter
                    </button>
                  </div>
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
                      <i className="fas fa-dot-circle"></i>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                {payments.message && (
                  <div className="alert alert-danger text-center">
                    {payments.message}
                  </div>
                )}
                <table className="transTable">
                  <thead>
                    <tr>
                      <td className="wsNwp">Date / Ora</td>
                      <td>Barcode</td>
                      <td className="wsNwp">User</td>
                      <td className="wsNwp">Service</td>
                      <td className="right">Importo</td>
                      <td className="right">Commissione</td>
                      <td className="right">Proviggione</td>
                      <td className="right">Saldo</td>
                    </tr>
                  </thead>
                  <tbody>
                    {!payments.message &&
                      (paymentsO || []).map((item, index) => {
                        return (
                          (
                            item.service_name &&
                            item.service_name.toString().toLowerCase()
                          ).includes(this.props.navbarSearch.toLowerCase()) && (
                            <tr
                              key={index}
                              onClick={() =>
                                this.showModal(
                                  index,
                                  item.barcode,
                                  item.agency_name,
                                  item.agency_address,
                                  item.agency_phone
                                )
                              }
                            >
                              <td className="wsNwp">
                                {moment(item.executed_date).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                              </td>
                              <td>
                                <div className="bc">{item.barcode}</div>
                              </td>
                              <td className="wsNwp">
                                {" "}
                                <i
                                  className="fal fa-user-circle"
                                  aria-hidden="true"
                                ></i>{" "}
                                {item.agency_name}
                              </td>
                              <td className="wsNwp">{item.service_name}</td>

                              <td className="right">
                                {item.price1000
                                  ? slicedAmount(item.price1000 / 1000)
                                  : "-"}
                                €
                              </td>
                              <td className="right">
                                {item.commissione}€
                                {/* {item.commissione ? item.commissione : "-"}{" "} */}
                              </td>
                              <td className="right">
                                {item.percentage}€
                                {/* {parseInt(item.percentage) > 0
                                ? item.percentage
                                : "-"} */}
                              </td>
                              <td className="right">
                                {" "}
                                {item.saldo !== "-" ? item.saldo + "€" : "-"}
                              </td>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
            title={null}
            visible={this.state.visible}
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
                  <span className="superSmall">
                    V.le XXIII Settembre 1845 n. 67 Rimini (RN) Italia
                  </span>
                  <span className="superSmall link">
                    www.bpoint.store - info@bpoint.store
                  </span>
                  <span className="superSmall ">Tel: +39 0541 087890</span>
                  <span className="superSmall tel">P.IVA 03852290406</span>

                  {/* <span>BPOINT</span> */}

                  <span className="fontSmall text-bold">
                    {this.state.name.charAt(0).toUpperCase() +
                      this.state.name.slice(1).toLocaleLowerCase()}
                  </span>
                  <span className="fontSmall address">
                    {this.state.address.charAt(0).toUpperCase() +
                      this.state.address.slice(1).toLocaleLowerCase()}
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
                    __html: payments[indexT].receipt

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
  usernames: state.auth.usernames,
  accountInfo: state.auth.accountInfo,
  navbarSearch: state.main.navbarSearch,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  TransazioniF
);
