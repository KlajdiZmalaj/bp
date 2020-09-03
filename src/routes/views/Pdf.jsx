import React, { useState, useEffect, useRef } from "react";
import { numberWithCommas } from "utils/HelperFunc";
import ReactToPrint from "react-to-print";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#c52727" }} spin />
);
export default ({
  getPaymentsForExcel,
  username,
  perPage,
  payments,
  from,
  to,
  paymentExcelLoading,
}) => {
  const ref = useRef(null);
  const print = useRef(null);

  const [toPrint, setPrint] = useState(false);
  useEffect(() => {
    if (print.current && !paymentExcelLoading) {
      print.current.click();
    }
  }, [paymentExcelLoading]);
  return (
    <div className="exportPDF">
      {payments.length > 0 && toPrint ? (
        <ReactToPrint
          trigger={() => (
            <div ref={print}>
              <i className="fal fa-file-pdf"></i> <Spin indicator={antIcon} />
            </div>
          )}
          onBeforePrint={() => {
            setPrint(false);
          }}
          content={() => ref.current}
          bodyClass="afterprint"
          // copyStyles="false"
        />
      ) : (
        <div
          onClick={() => {
            getPaymentsForExcel(username, from, to, "", perPage, "", "special");
            setPrint(true);
          }}
        >
          {" "}
          <i className="fal fa-file-pdf"></i>{" "}
          {paymentExcelLoading && toPrint ? (
            <Spin indicator={antIcon} />
          ) : (
            "PDF "
          )}
        </div>
      )}
      <table id="pdfTable" ref={ref} className="tablePrint">
        <thead>
          <tr>
            <th>Date / Ora</th>
            <th>Barcode</th>
            <th>User</th>
            <th>Service</th>
            <th>Importo</th>
            <th>Commissione</th>
            <th>Proviggione</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {(payments || []).map((pay) => (
            <tr key={pay.id}>
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
