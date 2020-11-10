import React from "react";
import images from "themes/images";
import ReactToPrint from "react-to-print";

export default ({ printT, skinExtras, rechargeMobile, setPrint }) => {
  return (
    <div className="printModal" ref={printT}>
      <div className="headerModal">
        <img className="logo" src={images.logo} alt="" />
        <span className="superSmall text-bold">
          MAPE <span>di Hristova Mariya Hristova e C.s.a.s.</span>
        </span>
        <span className="superSmall">{skinExtras.address}</span>
        <span className="superSmall link">{skinExtras.mail}</span>
        <span className="superSmall ">Tel: {skinExtras.cel}</span>
        <span className="superSmall tel">P.IVA 03852290406</span>
        <span className="fontSmall text-bold">
          {rechargeMobile.agency_name}
        </span>
        <span className="fontSmall address">
          {rechargeMobile.agency_address}
        </span>
        {/* <span className="userCel">
                    {" "}
                    Telefono: <b>{rechargeMobile.agency_phone}</b>{" "}
                  </span> */}
        {/* <span>BPOINT</span> */}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html:
            rechargeMobile.receipt &&
            rechargeMobile.receipt
              // .replace(/</g, "&lt;")
              // .replace(/>/g, "&gt;")
              .replace(/\t/g, "\u00a0")
              .replace(/\n/g, "<br/> ")
              .replace(/\+/g, " ")
              .replace(/: /g, ":<div class='marginB'></div>")
              .replace(
                /<div class='marginB'><\/div>([^>]+)<br\/>/g,
                "<div class='marginB'></div><div class='marginC'>$1</div><br/>"
              ),
        }}
      />
      <img
        className="qrCodeImg"
        src={`https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2F${window.location.host}%2F%23%2Fqr%2F${rechargeMobile.barcode}&size=420x420&margin=10`}
        alt=""
      />
      <img
        className="barcodeModal"
        src={`https://barcode.tec-it.com/barcode.ashx?data=${rechargeMobile.barcode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
        alt=""
      />

      <div className="btn-group" role="group">
        <ReactToPrint
          trigger={() => (
            <button type="button" className="stampBtn">
              <img src={images.checkSymbol} alt="" />
              <br />
              Stampa
            </button>
          )}
          content={() => printT.current}
          bodyClass="afterprint"
          // copyStyles="false"
        />

        <button
          type="button"
          className="AnnullaBtn"
          onClick={() => {
            setPrint(false);
          }}
        >
          <img src={images.close} alt="" /> <br />
          Annulla
        </button>
      </div>
    </div>
  );
};
