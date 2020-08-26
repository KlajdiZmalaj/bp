import React from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import axios from "axios";
class Excel extends React.Component {
  csvLink = React.createRef();

  state = {
    clickedLink: false,
  };
  componentDidUpdate() {
    if (
      this.props.paymentExcelLoading === false &&
      this.state.clickedLink === true &&
      this.props.payments &&
      this.props.payments != {}
    ) {
      this.csvLink.current.link.click();
    }
  }
  render() {
    const {
      paymentExcelLoading,
      payments,
      perPage,
      from,
      to,
      username,
    } = this.props;
    const { clickedLink } = this.state;
    const headers = [
      { label: "Date / Ora", key: "executed_date" },
      { label: "Barcode            ", key: "barcode" },
      { label: "User", key: "agency_name" },
      { label: "Service", key: "service_name" },
      { label: "Importo", key: "price1000" },
      { label: "Commissione", key: "commissione" },
      { label: "Proviggione", key: "percentage" },
      { label: "Saldo", key: "saldo" },
    ];
    console.log(payments);
    const dataSet =
      payments && Array.isArray(payments)
        ? [
            ...(payments &&
              Array.isArray(payments) &&
              payments.map((pay) => {
                return {
                  executed_date: pay.executed_date + `  `,
                  barcode: '=""' + pay.barcode + '""',
                  agency_name: pay.agency_name,
                  service_name: pay.service_name,
                  price1000: pay.price1000 / 1000 + `  €`,
                  commissione: pay.commissione + `  €`,
                  percentage: pay.percentage + `  €`,
                  saldo: pay.saldo + `  €`,
                };
              })),
          ]
        : [];
    return (
      <React.Fragment>
        <span
          className="ExportToExel"
          onClick={() => {
            this.props.getPaymentsForExcel(
              username,
              from,
              to,
              "",
              perPage,
              "",
              "special"
            );
            this.setState({ clickedLink: true });
          }}
        >
          <i class="far fa-file-excel"></i>
          {this.props.activeSkinId === -1 &&
          document.querySelector("body").classList.contains("bodyAdmin") ? (
            <span>No data For this skin</span>
          ) : (
            <span style={{ cursor: "pointer" }}>
              {paymentExcelLoading === true && clickedLink === true
                ? "Aspetti..."
                : "Esportare i dati completi in Excel"}
            </span>
          )}
        </span>
        <CSVLink
          separator={","}
          ref={this.csvLink}
          data={dataSet}
          headers={headers}
          filename={"Tranzacioni.csv"}
          className="hidden"
          target="_blank"
        ></CSVLink>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  paymentExcelLoading: state.auth.paymentExcelLoading,
  activeSkinId: state.main.activeSkinId,
});
export default connect(mapStateToProps, AuthActions)(Excel);
