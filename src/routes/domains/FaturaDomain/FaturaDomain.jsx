import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import CalendarRangePicker from "shared-components/CalendarRangePicker/CalendarRangePicker";
import { format } from "date-fns";
class FaturaDomain extends React.Component {
  state = {
    calendarVis: false,
    fromLabel: "",
    toLabel: "",
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
  };
  setCalendar = (val) => {
    this.setState({ calendarVis: val });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  componentDidMount() {
    this.props.getFaturaDetails(1, 2000, 5);
  }
  render() {
    const { faturaDetails, skinExtras } = this.props;
    const { calendarVis, toLabel, fromLabel, picker } = this.state;
    const { payment_data } = faturaDetails;
    return (
      <div className="Container">
        <div className="FaturaDomain">
          <div className="panels-container">
            {calendarVis && (
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
                handleSubmit={this.handleSubmit}
              />
            )}
            <div className="row no-gutters max-width">
              <div className="FauturaFilter">
                <div className="FauturaFilter--Header">
                  <div>Fature</div>
                </div>
                <div className="FauturaFilter--Options">
                  <div>
                    <div className="Ricerca">
                      <input placeholder="Ricerca User" />
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

                      {fromLabel
                        ? `${fromLabel} - ${toLabel}`
                        : "Seleziona la data"}
                      <i
                        class={`fal fa-chevron-${calendarVis ? "up" : "down"}`}
                        onClick={() => {
                          this.setCalendar(!calendarVis);
                        }}
                      ></i>
                    </div>
                  </div>
                  <button>Filtra</button>
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
                    <tr>
                      <td class="wsNwp">Numero</td>
                      <td class="wsNwp">Date / Ora</td>
                      <td class="wsNwp">User</td>
                      <td class="wsNwp">Descrizione</td>
                      <td class="wsNwp">Importo</td>
                      <td class="wsNwp">Commissione</td>
                      <td class=" wsNwp">Proviggione</td>
                      <td class=" wsNwp">
                        <i className="fal fa-file-pdf"></i>
                        <i className="far fa-print"></i>
                        <i class="far fa-envelope-open-text"></i>
                      </td>
                    </tr>
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
});
export default connect(mpst, AuthActions)(FaturaDomain);
