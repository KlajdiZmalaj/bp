import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
  render() {
    const dataSet = [...this.props.payments];
    console.log(dataSet);
    return (
      <ExcelFile element={<button>Download Data</button>}>
        <ExcelSheet data={dataSet} name="TRANZACIONI">
          <ExcelColumn label="Date / Ora" value="executed_date" />
          <ExcelColumn label="Barcode" value="barcode" />
          <ExcelColumn label="User" value="agency_name" />
          <ExcelColumn label="Service" value="service_name" />
          <ExcelColumn label="Importo" value="price1000" />
          <ExcelColumn label="Commissione" value="commissione" />
          <ExcelColumn label="Proviggione" value="percentage" />
          <ExcelColumn label="Saldo" value="saldo" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

const mapStateToProps = (state) => ({
  payments: state.auth.payments,
});
export default Download;
