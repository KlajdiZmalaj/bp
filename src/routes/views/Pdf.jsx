import React, { useEffect, useRef } from "react";
import { numberWithCommas } from "utils/HelperFunc";
import ReactToPdf from "react-to-pdf";

export default ({
  getPaymentsForExcel,
  username,
  perPage,
  payments,
  from,
  to,
}) => {
  const ref = useRef(null);
  useEffect(() => {}, payments);
  console.log("paymentspdf", payments);
  console.log("ref", ref);
  return (
    <div className="exportPDF">
      <ReactToPdf x={0} y={0} targetRef={ref} filename="div-blue.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf>
      <button
        onClick={() => {
          getPaymentsForExcel(username, from, to, "", perPage, "", "special");
        }}
      >
        Download PDF
      </button>
      <table id="test" ref={ref} className="tablePrint">
        <thead>
          <th>Date / Ora</th>
          <th>Barcode</th>
          <th>User</th>
          <th>Service</th>
          <th>Importo</th>
          <th>Commissione</th>
          <th>Proviggione</th>
          <th>Saldo</th>
        </thead>
        <tbody>
          {(payments || []).map((pay) => (
            <tr>
              <td>{pay.executed_date}</td>
              <td>{pay.barcode}</td>
              <td>{pay.agency_name}</td>
              <td>{pay.service_name}</td>
              <td>{numberWithCommas(pay.price1000 / 1000)}</td>
              <td>{pay.commissione}</td>
              <td>{pay.percentage}</td>
              <td>{pay.saldo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
