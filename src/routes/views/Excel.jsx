import React from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";

class Excel extends React.Component {
  componentWillMount() {
    const { username, from, to, perPage } = this.props;
    this.props.getPaymentsForExcel(
      username,
      from,
      to,
      "",
      perPage,
      "",
      "special"
    );
  }
  componentDidUpdate(prevProps) {
    const { username, from, to, perPage } = this.props;
    if (
      username != prevProps.username ||
      from != prevProps.from ||
      to != prevProps.to ||
      perPage != prevProps.perPage
    ) {
      this.props.getPaymentsForExcel(
        username,
        from,
        to,
        "",
        perPage,
        "",
        "special"
      );
    }
  }
  render() {
    const { paymentExcelLoading, payments } = this.props;
    const headers = [
      { label: "Date / Ora", key: "executed_date" },
      { label: "Barcode", key: "barcode" },
      { label: "User", key: "agency_name" },
      { label: "Service", key: "service_name" },
      { label: "Importo", key: "price1000" },
      { label: "Commissione", key: "commissione" },
      { label: "Proviggione", key: "percentage" },
      { label: "Saldo", key: "saldo" },
    ];
    const dataSet =
      payments && Array.isArray(payments)
        ? [
            ...(payments &&
              Array.isArray(payments) &&
              payments.map((pay) => {
                return {
                  executed_date: pay.executed_date,
                  barcode: pay.barcode,
                  agency_name: pay.agency_name,
                  service_name: pay.service_name,
                  price1000: pay.price1000,
                  commissione: pay.commissione,
                  percentage: pay.percentage,
                  saldo: pay.saldo,
                };
              })),
          ]
        : [];
    return paymentExcelLoading === true ? (
      <div className="ExportToExel">
        <span>
          <i class="far fa-file-excel"></i>
          {this.props.activeSkinId === -1 &&
          document.querySelector("body").classList.contains("bodyAdmin") ? (
            <span>No data For this skin</span>
          ) : (
            <span>In attesa di dati completi ...</span>
          )}
        </span>
      </div>
    ) : (
      <CSVLink
        data={dataSet}
        headers={headers}
        filename={"Tranzacioni.csv"}
        className="ExportToExel"
      >
        <span>
          <i class="far fa-file-excel"></i>
          {this.props.activeSkinId === -1 &&
          document.querySelector("body").classList.contains("bodyAdmin") ? (
            <span>No data For this skin</span>
          ) : (
            <span>Esportare i dati completi in Excel</span>
          )}
        </span>
      </CSVLink>
    );
  }
}
const mapStateToProps = (state) => ({
  paymentExcelLoading: state.auth.paymentExcelLoading,
  activeSkinId: state.main.activeSkinId,
});
export default connect(mapStateToProps, AuthActions)(Excel);
