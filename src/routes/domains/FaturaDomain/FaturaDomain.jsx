import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import { allRoles } from "config/index";
let years = [];
for (let i = 2000; i <= new Date().getFullYear(); i++) {
  years.push({ id: i - 1999, name: i });
}
const months = [
  { id: 1, name: "Gennaio" },
  { id: 2, name: "Febbraio" },
  { id: 3, name: "Marzo" },
  { id: 4, name: "Aprile" },
  { id: 5, name: "Maggio" },
  { id: 6, name: "giugno" },
  { id: 7, name: "Luglio" },
  { id: 8, name: "Agosto" },
  { id: 9, name: "Settembre" },
  { id: 10, name: "Ottobre" },
  { id: 11, name: "Novembre" },
  { id: 12, name: "Dicembre" },
];
class FaturaDomain extends React.Component {
  state = {
    yearDropdown: false,
    monthDropdown: false,
    yearChosen: "",
    monthChosen: "",
    calendarVis: false,
    userName: "",
    userListShow: false,
  };
  setCalendar = (val) => {
    this.setState({ calendarVis: val });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  componentDidMount() {
    this.props.getFaturaDetails(1, 2000, 5);
    this.props.getAllFaturaBySearch(null, null, null);
  }
  render() {
    const { faturaDetails, Fatture, skinExtras } = this.props;
    const {
      calendarVis,
      monthDropdown,
      yearDropdown,
      monthChosen,
      yearChosen,
      userName,
      userListShow,
    } = this.state;
    const faturaDet = Fatture?.FaturaDetails;
    const Users = Fatture?.Users;
    return (
      <div className="Container">
        <div className="FaturaDomain">
          <div className="panels-container">
            <div className="row no-gutters max-width">
              <div className="FauturaFilter">
                {calendarVis && (
                  <React.Fragment>
                    <div className="Chose--Month">
                      <div
                        className="Header"
                        onClick={() => {
                          this.setState((state) => ({
                            monthDropdown: !state.monthDropdown,
                          }));
                        }}
                      >
                        {`${
                          monthChosen?.name ? monthChosen.name : " Chose Month"
                        }`}
                      </div>
                      {monthDropdown && (
                        <div className="Body">
                          {months.map((month) => {
                            return (
                              <div
                                className="month"
                                onClick={() => {
                                  this.setState((state) => ({
                                    monthChosen: {
                                      id: month.id,
                                      name: month.name,
                                    },
                                    monthDropdown: !state.monthDropdown,
                                  }));
                                }}
                                className={`${
                                  monthChosen.name === month.name
                                    ? "active"
                                    : ""
                                }`}
                                key={month.id}
                              >
                                {month.name}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="Chose--Year">
                      <div
                        className="Header"
                        onClick={() => {
                          this.setState((state) => ({
                            yearDropdown: !state.yearDropdown,
                          }));
                        }}
                      >
                        {`${yearChosen ? yearChosen : " Chose Year"}`}
                      </div>
                      {yearDropdown && (
                        <div className="Body">
                          {years.map((year) => {
                            return (
                              <div
                                className="year"
                                onClick={() => {
                                  this.setState((state) => ({
                                    yearChosen: year.name,
                                    yearDropdown: !state.yearDropdown,
                                  }));
                                }}
                                className={`${
                                  yearChosen === year.name ? "active" : ""
                                }`}
                                key={year.id}
                              >
                                {year.name}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}
                <div className="FauturaFilter--Header">
                  <div>Fature</div>
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
                        <div className="Ricerca--UserList">
                          {Users &&
                            Array.isArray(Users) &&
                            Users.filter(
                              (user) =>
                                user.includes(userName) || userName === ""
                            ).map((user) => (
                              <div
                                onClick={() => {
                                  this.setState({
                                    userName: user,
                                    userListShow: false,
                                  });
                                }}
                              >
                                {user}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="Search">
                      <i className="fal fa-search"></i>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <div
                      className="FauturaFilter--CalendarLabel"
                      onClick={(e) => {
                        if (e.target.tagName != "I") {
                          this.setCalendar(!calendarVis);
                        }
                      }}
                    >
                      <i className="fal fa-calendar-alt"></i>

                      {monthChosen && yearChosen
                        ? `${monthChosen.name} / ${yearChosen}`
                        : "Seleziona la data"}
                      <i
                        class={`fal fa-chevron-${calendarVis ? "up" : "down"}`}
                        onClick={() => {
                          this.setCalendar(!calendarVis);
                        }}
                      ></i>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      this.props.getAllFaturaBySearch(
                        userName,
                        monthChosen.id,
                        yearChosen
                      );
                    }}
                  >
                    Filtra
                  </button>
                </div>
              </div>
            </div>
            <div className="row no-gutters max-width">
              <div className="FaturaTable">
                <table class="transTable">
                  <thead>
                    <tr>
                      <td class="wsNwp">Numero</td>
                      <td class="wsNwp">Date / Ora</td>
                      <td class="wsNwp">User</td>
                      <td class="wsNwp">Descrizione</td>
                      <td class="wsNwp">Importo</td>
                      <td class="wsNwp">Commissione</td>
                      <td class=" wsNwp">Proviggione</td>
                      <td class=" wsNwp">Operazione</td>
                    </tr>
                  </thead>
                  <tbody>
                    {faturaDet &&
                      Array.isArray(faturaDet) &&
                      faturaDet.map((fatura) => (
                        <tr>
                          <td class="wsNwp">{fatura.numero}</td>
                          <td class="wsNwp">{fatura.time}</td>
                          <td class="wsNwp">
                            <span>
                              <i className="fal fa-store"></i>
                              {fatura.user}
                            </span>
                          </td>
                          <td class="wsNwp">{fatura.descrizione}</td>
                          <td class="wsNwp">{fatura.importo}</td>
                          <td class="wsNwp">{fatura.commissione}</td>
                          <td class="wsNwp">{fatura.proviggione}</td>
                          <td class=" wsNwp">
                            <i className="fal fa-file-pdf"></i>
                            <i className="far fa-print"></i>
                            <i
                              class="far fa-envelope-open-text"
                              onClick={() => {
                                this.props.sendMailFattura(fatura.file_name);
                              }}
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mpst = (state) => ({
  faturaDetails: state.auth.faturaDetails,
  skinExtras: state.auth.skinExtras,
  Fatture: state.auth.Fatture,
});
export default connect(mpst, AuthActions)(FaturaDomain);
