import React from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import { numberWithCommas } from "utils/HelperFunc";
import { Spin } from "antd";

const antIcon = (
  <i style={{ fontSize: 24 }} className="fad fa-spinner-third fa-spin"></i>
);
class Excel extends React.Component {
  csvLink = React.createRef();

  state = {
    clickedLink: false,
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.paymentExcelLoading === true &&
      this.props.paymentExcelLoading === false &&
      this.state.clickedLink === true &&
      this.props.payments &&
      this.props.payments !== {}
    ) {
      this.csvLink.current.link.click();
      this.setState({ clickedLink: false });
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
                  price1000: numberWithCommas(pay.price1000 / 1000) + `  €`,
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
          <i className="far fa-file-csv"></i>
          {this.props.activeSkinId === -1 &&
          document.querySelector("body").classList.contains("bodyAdmin") ? (
            <span>No data For this skin</span>
          ) : (
            <span style={{ cursor: "pointer" }}>
              {paymentExcelLoading === true && clickedLink === true ? (
                <Spin indicator={antIcon} />
              ) : (
                "Csv"
              )}
            </span>
          )}
        </span>
        <CSVLink
          separator={","}
          ref={this.csvLink}
          data={dataSet}
          headers={headers}
          filename={
            from ? `Transazioni${from + "-" + to}.csv` : "Transazioni.csv"
          }
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
