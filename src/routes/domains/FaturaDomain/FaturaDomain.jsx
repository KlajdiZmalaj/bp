import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import { printFatturaReq } from "services/auth";
import DatePicker from "./DatePicker";
import ClickOut from "react-onclickout";
import { Loader } from "shared-components";
import { Select, Pagination } from "antd";
import { b64toBlob } from "utils";

const { Option } = Select;
class FaturaDomain extends React.Component {
  state = {
    yearDropdown: false,
    monthDropdown: false,
    yearChosen: "",
    monthChosen: "",
    calendarVis: false,
    userName: "",
    userListShow: false,
    perPage: 25,
    page_number: 1,
    clickedPage: 1,
  };
  setCalendar = (val) => {
    this.setState({ calendarVis: val });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };
  convertB64ToBolbThenPrnt(file_name, open) {
    printFatturaReq(file_name).then(async (response) => {
      var myBlob = b64toBlob(response.data.base64, "application/pdf");
      var objectURL = URL.createObjectURL(myBlob);
      document.querySelector("#pdf-frame").src = "";
      document.querySelector("#pdf-frame").src = objectURL;

      if (open) {
        window.open(
          objectURL,
          "_blank",
          "toolbar=no,scrollbars=no,resizable=no,top=50,left=500,width=1024,height=700"
        );
      } else {
        window.setTimeout(function () {
          document.querySelector("#pdf-frame").contentWindow.print();
        }, 1000);
      }
      objectURL = URL.revokeObjectURL(myBlob);
    });
  }
  componentDidMount() {
    this.props.getAllFaturaBySearch(null, null, null, 25, 1);
  }
  render() {
    const { faturaDetails, Users, total_pages } = this.props;
    const {
      calendarVis,
      monthDropdown,
      yearDropdown,
      monthChosen,
      yearChosen,
      userName,
      userListShow,
      perPage,
      page_number,
      clickedPage,
    } = this.state;
    return (
      <div className="Container">
        <div className="FaturaDomain">
          <div className="panels-container">
            <div className="row no-gutters maxWidth">
              <div className="FauturaFilter">
                {calendarVis && (
                  <DatePicker
                    setMonthDropdown={() => {
                      this.setState((state) => ({
                        monthDropdown: !state.monthDropdown,
                      }));
                    }}
                    setYearDropdown={() => {
                      this.setState((state) => ({
                        yearDropdown: !state.yearDropdown,
                      }));
                    }}
                    setMonthChosen={(month) => {
                      this.setState((state) => ({
                        monthChosen:
                          month.id === state.monthChosen.id
                            ? ""
                            : { id: month.id, name: month.name },
                        monthDropdown: !state.monthDropdown,
                      }));
                    }}
                    setYearChosen={(year) => {
                      this.setState((state) => ({
                        yearChosen:
                          year.name === state.yearChosen ? "" : year.name,
                        yearDropdown: !state.yearDropdown,
                      }));
                    }}
                    yearChosen={yearChosen}
                    monthChosen={monthChosen}
                    monthDropdown={monthDropdown}
                    yearDropdown={yearDropdown}
                  />
                )}
                <div className="FauturaFilter--Header">
                  <div>Fatture</div>
                </div>
                <div className="FauturaFilter--Options">
                  <div>
                    <div className="Ricerca">
                      <input
                        onClick={() => {
                          this.setState((state) => ({
                            userListShow: !state.userListShow,
                          }));
                        }}
                        placeholder="Ricerca User"
                        onChange={(e) => {
                          this.setState({
                            userName: e.target.value,
                          });
                          if (userListShow === false) {
                            this.setState({ userListShow: true });
                          }
                        }}
                        value={userName}
                      />
                      {userListShow && (
                        <ClickOut
                          onClickOut={() =>
                            this.setState({ userListShow: false })
                          }
                        >
                          <div className="Ricerca--UserList">
                            {Users &&
                              Array.isArray(Users) &&
                              Users.filter(
                                (user) =>
                                  user
                                    .toLowerCase()
                                    .includes(userName.toLowerCase()) ||
                                  userName === ""
                              ).map((user) => (
                                <div
                                  onClick={() => {
                                    this.setState({
                                      userName: user,
                                      userListShow: false,
                                    });
                                  }}
                                  key={user}
                                >
                                  {user}
                                </div>
                              ))}
                          </div>
                        </ClickOut>
                      )}
                    </div>
                    <div className="Search">
                      <i className="fal fa-search"></i>
                    </div>
                  </div>
                  <div>
                    <div
                      className="FauturaFilter--CalendarLabel"
                      onClick={(e) => {
                        if (e.target.tagName !== "I") {
                          this.setCalendar(!calendarVis);
                        }
                      }}
                    >
                      <i className="fal fa-calendar-alt"></i>

                      {monthChosen && yearChosen
                        ? `${monthChosen.name} / ${yearChosen}`
                        : "Seleziona la data"}
                      <i
                        className={`fal fa-chevron-${
                          calendarVis ? "up" : "down"
                        }`}
                        onClick={() => {
                          this.setCalendar(!calendarVis);
                        }}
                      ></i>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ clickedPage: 1 });
                      this.props.getAllFaturaBySearch(
                        userName,
                        monthChosen.id,
                        yearChosen,
                        perPage,
                        page_number
                      );
                    }}
                  >
                    Filtra
                  </button>
                </div>
              </div>
            </div>
            <div className="row no-gutters maxWidth">
              {!this.props.fattura_loading ? (
                <div className="FaturaTable">
                  <table className="transTable">
                    <thead>
                      <tr>
                        <td className="wsNwp">Numero</td>
                        <td className="wsNwp">Date / Ora</td>
                        <td className="wsNwp">User</td>
                        <td className="wsNwp">Descrizione</td>
                        <td className="wsNwp">Importo</td>
                        <td className="wsNwp">Commissione</td>
                        <td className=" wsNwp">Proviggione</td>
                        <td className=" wsNwp">Operazione</td>
                      </tr>
                    </thead>
                    <tbody>
                      {faturaDetails &&
                        Array.isArray(faturaDetails) &&
                        faturaDetails.map((fatura) => (
                          <tr key={fatura.user + fatura.numero}>
                            <td className="wsNwp">{fatura.numero}</td>
                            <td className="wsNwp">{fatura.time}</td>
                            <td className="wsNwp">
                              <span>
                                <i className="fal fa-store"></i>
                                {fatura.user}
                              </span>
                            </td>
                            <td className="wsNwp">{fatura.descrizione}</td>
                            <td className="wsNwp">{fatura.importo}</td>
                            <td className="wsNwp">{fatura.commissione}</td>
                            <td className="wsNwp">{fatura.proviggione}</td>
                            <td className=" wsNwp">
                              {/* <a
                                href={`https://services-api.bpoint.store/storage/fatture/${fatura.file_name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fal fa-file-pdf"></i>
                              </a> */}
                              <i
                                onClick={() => {
                                  this.convertB64ToBolbThenPrnt(
                                    fatura.file_name,
                                    "open"
                                  );
                                }}
                                className="fal fa-file-pdf"
                              ></i>
                              <i
                                className="far fa-print"
                                onClick={() => {
                                  this.convertB64ToBolbThenPrnt(
                                    fatura.file_name
                                  );
                                }}
                              ></i>
                              <iframe
                                id="pdf-frame"
                                title="pdf-frame-fattura"
                                style={{ display: "none" }}
                              ></iframe>
                              <i
                                className="far fa-envelope-open-text"
                                onClick={() => {
                                  this.props.sendMailFattura(fatura.file_name);
                                }}
                              ></i>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="paginationWrapper">
                    <Pagination
                      onChange={(e) => {
                        this.setState({ clickedPage: e });
                        this.props.getAllFaturaBySearch(
                          userName,
                          monthChosen.id,
                          yearChosen,
                          perPage,
                          e
                        );
                      }}
                      total={total_pages ? total_pages * 10 : 1}
                      current={clickedPage}
                    />
                    <Select
                      defaultValue={25}
                      onChange={(e) => {
                        this.setState(
                          { perPage: parseInt(e), clickedPage: 1 },
                          () => {
                            this.props.getAllFaturaBySearch(
                              userName,
                              monthChosen.id,
                              yearChosen,
                              parseInt(e),
                              page_number
                            );
                          }
                        );
                      }}
                      value={this.state.perPage}
                    >
                      <Option value={10}>10 / Pagina</Option>
                      <Option value={25}>25 / Pagina</Option>
                      <Option value={50}>50 / Pagina</Option>
                    </Select>
                  </div>
                </div>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mpst = (state) => ({
  faturaDetails: state.auth.Fatture.FaturaDetails,
  total_pages: state.auth.Fatture.total_pages,
  skinExtras: state.auth.skinExtras,
  Users: state.auth.Fatture.Users,
  screenWidth: state.main.screenWidth,
  fattura_loading: state.auth.fattura_loading,
});
export default connect(mpst, AuthActions)(FaturaDomain);
