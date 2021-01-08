import React, { Fragment } from "react";
import "./Statistiche.css";
import SimpleGraph from "shared-components/Graph/SimpleGraph";
import AuthAction from "redux-store/models/auth";
import { connect } from "react-redux";
class Statistiche extends React.Component {
  // componentDidMount() {
  //   this.props.getStatisticheMain();
  // }
  componentDidUpdate(prevProps) {
    if (this.props.ReportisticaDet !== prevProps.ReportisticaDet) {
      this.props.getStatisticheMain();
    }
  }

  render() {
    const { userRole, StatisticheMain, ReportisticaDet } = this.props;
    return (
      StatisticheMain && (
        <div
          id="SpecStatistich"
          className={`Statist ${ReportisticaDet ? "min" : ""}`}
        >
          <div className={`data Categories ${ReportisticaDet ? "min" : ""}`}>
            <SimpleGraph
              graphicData={StatisticheMain?.data?.transazioni}
              handleMouseEntering={() => {}}
              handleClick={() => {}}
              AdditionalComp={
                <Fragment>
                  <div>{StatisticheMain?.total.transazioni + "€"}</div>
                  <div>TRANSAZIONI TOTALI</div>
                </Fragment>
              }
              className={`${ReportisticaDet ? "min" : ""}`}
            />
            <SimpleGraph
              graphicData={StatisticheMain?.data?.commissioni}
              handleMouseEntering={() => {}}
              handleClick={() => {}}
              AdditionalComp={
                <Fragment>
                  <div>{StatisticheMain?.total?.commissioni + "€"}</div>
                  <div>Commisioni</div>
                </Fragment>
              }
              className={`${ReportisticaDet ? "min" : ""}`}
            />
            {userRole !== "user" && (
              <SimpleGraph
                graphicData={StatisticheMain?.data?.proviggioni}
                handleMouseEntering={() => {}}
                handleClick={() => {}}
                className={`${ReportisticaDet ? "min" : ""}`}
                AdditionalComp={
                  <Fragment>
                    <div>{StatisticheMain?.total?.proviggioni + "€"}</div>
                    <div>Proviggioni</div>
                  </Fragment>
                }
              />
            )}
            {userRole === "super_admin" && (
              <div
                className={`Additinal Statist ${ReportisticaDet ? "min" : ""}`}
              >
                <div className="saldoRete">
                  <span>{StatisticheMain?.rete?.saldo_rete + "€"}</span>
                  <span>Saldo Rete</span>
                </div>

                <div>
                  <div className="agenti">
                    <span>{StatisticheMain?.rete?.agenti}</span>
                    <span>
                      <span>
                        <i className="fal fa-user-tie" />
                      </span>
                      <span>Agenti</span>
                    </span>
                  </div>
                  <div className="agenzie">
                    <span>{StatisticheMain?.rete?.agencie}</span>
                    <span>
                      <span>
                        <i className="fal fa-store" />
                      </span>
                      <span>Agenzie</span>
                    </span>
                  </div>
                  <div className="utenti">
                    <span>{StatisticheMain?.rete?.utenti}</span>
                    <span>
                      <span>
                        <i className="fal fa-user " />
                      </span>
                      <span>Utenti</span>
                    </span>
                  </div>
                </div>
              </div>
            )}{" "}
          </div>
        </div>
      )
    );
  }
}
const mapStateToProps = (state) => ({
  StatisticheMain: state.auth.StatisticheMain,
  ReportisticaDet: state.auth.ReportisticaDet,
});
export default connect(mapStateToProps, AuthAction)(Statistiche);
