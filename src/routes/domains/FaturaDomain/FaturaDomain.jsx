import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import { printFatturaReq } from "services/auth";
import DatePicker from "./DatePicker";

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
  convertB64ToBolbThenPrnt(file_name) {
    printFatturaReq(file_name).then(async (response) => {
      const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {
          type: contentType,
        });
        return blob;
      };
      var myBlob = b64toBlob(response.data.base64, "application/pdf");
      var objectURL = URL.createObjectURL(myBlob);
      document.querySelector("#pdf-frame").src = "";
      document.querySelector("#pdf-frame").src = objectURL;
      objectURL = URL.revokeObjectURL(myBlob);
      window.setTimeout(function () {
        document.querySelector("#pdf-frame").contentWindow.print();
      }, 1000);
    });
  }
  // PreviewPdf(file_name) {
  //   printFatturaReq(file_name).then(async (response) => {
  //     var winparams =
  //       "dependent=yes,locationbar=no,scrollbars=yes,menubar=yes," +
  //       `resizable,screenX=50,screenY=50,width=${
  //         this.props.screenWidth < 1000
  //           ? this.props.screenWidth
  //           : (this.props.screenWidth * 80) / 100
  //       },height=900`;
  //     var htmlPop =
  //       "<iframe width=100% height=100%" +
  //       ' type="application/pdf"' +
  //       ' src="data:application/pdf;base64,' +
  //       escape(response.data.base64) +
  //       '"></iframe>';

  //     var printWindow = window.open("", "PDF", winparams);
  //     printWindow.document.write(htmlPop);
  //   });
  // }
  componentDidMount() {
    this.props.getAllFaturaBySearch(null, null, null);
  }
  render() {
    const { Fatture } = this.props;
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
                        monthChosen: {
                          id: month.id,
                          name: month.name,
                        },
                        monthDropdown: !state.monthDropdown,
                      }));
                    }}
                    setYearChosen={(year) => {
                      this.setState((state) => ({
                        yearChosen: year.name,
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
                            <a
                              href={`https://services-api.bpoint.store/storage/fatture/${fatura.file_name}`}
                              target="_blank"
                            >
                              <i className="fal fa-file-pdf"></i>
                            </a>
                            <i
                              className="far fa-print"
                              onClick={() => {
                                this.convertB64ToBolbThenPrnt(fatura.file_name);
                              }}
                            ></i>
                            <iframe
                              id="pdf-frame"
                              style={{ display: "none" }}
                            ></iframe>
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
  screenWidth: state.main.screenWidth,
});
export default connect(mpst, AuthActions)(FaturaDomain);
