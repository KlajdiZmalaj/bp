import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { notification, message, Upload, Icon } from "antd";
import TopWrapper from "./TopWrapper";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng =
    file.type === "image/jpg" ||
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "aplication/pdf";
  if (!isJpgOrPng) {
    message.error("Solo JPG/PNG/PDF file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("Image must smaller than 10MB!");
  }
  // console.log("filee", file, file.size, isLt2M);
  return isJpgOrPng && isLt2M;
}

const PostePay = ({
  setService,
  services,
  activeService,
  allFavServices,
  toggleFavorite,
  postePay,
  postePayLoading,
  setPostePay,
  setPostePayLoading,
  getPostePay,
  userList,
  getUsersBySearch,
  setUsersBySearch,
}) => {
  const [selectedUser, setUser] = useState({});
  const [hasDD, setDD] = useState(false);
  const [intestatario, setintestatario] = useState("");
  const [img1, setImg1] = useState({ loading: false, imageUrl: "" });
  const [img2, setImg2] = useState({ loading: false, imageUrl: "" });
  const [view, setView] = useState("1");

  const [formData, setFormData] = useState({
    importo: 0,
    codiceInt: "",
  });
  const uploadButton = (
    <div>
      <Icon type={img1.loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChangeFront = (info) => {
    if (info.file.status) {
      getBase64(info.file.originFileObj, (imageUrl) =>
        setImg1({ loading: false, imageUrl })
      );
    }
  };
  const handleChangeBack = (info) => {
    if (info.file.status) {
      getBase64(info.file.originFileObj, (imageUrl) =>
        setImg2({ loading: false, imageUrl })
      );
    }
  };
  useEffect(() => {
    if (Object.values(postePay).length > 0)
      notification[postePay.errors ? "error" : "success"]({
        message: postePay.message,
        description: Object.values(postePay.errors || {}),
      });
  }, [postePay]);
  return (
    <div className="postepay">
      <div className="postepay--services">
        <TopWrapper
          activeService={activeService}
          setService={setService}
          services={services}
        />
      </div>
      <div className="bolletini--header">
        PostePay{" "}
        <i
          onClick={() => {
            if (allFavServices.includes("RCPP")) {
              toggleFavorite("RCPP", "remove");
            } else {
              toggleFavorite("RCPP", "set");
            }
          }}
          className={
            "fas fa-star" + (allFavServices.includes("RCPP") ? " active" : "")
          }
          aria-hidden="true"
        ></i>{" "}
      </div>
      <div className="postepay--subh">PAGAMENTI</div>
      <div className="postepay--inputs">
        <div className="postepay--inputs__item">
          <div className="label">Intestatario</div>
          <input
            value={intestatario}
            onChange={(e) => {
              setintestatario(e.target.value);
              if (e.target.value.length > 1) {
                setDD(true);
                getUsersBySearch(e.target.value);
              }
            }}
            type="text"
          />
          {hasDD && (
            <div className="dd-options">
              {Object.keys(userList).map((userType) => {
                return userList[userType].map((user) => {
                  return (
                    <div
                      key={user.first_name}
                      onClick={() => {
                        setUser({
                          userType,
                          user,
                        });
                        setintestatario(`${user.first_name} ${user.last_name}`);
                        setDD(false);
                        setUsersBySearch([]);
                        setFormData({
                          ...formData,
                          codiceInt: user.codice_fiscale_ordinante,
                        });
                      }}
                      className="option"
                      data-type={userType}
                    >
                      {`${user.first_name} ${user.last_name}`}
                    </div>
                  );
                });
              })}
            </div>
          )}
        </div>
        {selectedUser.userType === "no_photo" && (
          <div className="bolletini--inputs__item">
            <div className="label">Document View</div>
            <select
              onChange={(e) => {
                setView(e.target.value);
              }}
            >
              <option value="1">Front of Document</option>
              <option value="2">Back of Document</option>
            </select>
            <div className="label">Document Type</div>
            <select
              onChange={(e) =>
                setFormData({
                  ...formData,
                  document_type: e.target.value,
                })
              }
            >
              <option value="1">Cardta di identita</option>
              <option value="2">Patenta di guida</option>
              <option value="3">Passaporto</option>
            </select>

            <div className={"label" + (view === "2" ? " d-none" : "")}>
              Upload Front
            </div>
            <Upload
              name="front"
              listType="picture-card"
              className={"avatar-uploader" + (view === "2" ? " d-none" : "")}
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChangeFront}
            >
              {img1.imageUrl ? (
                <img
                  src={img1.imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <div className={"label" + (view === "1" ? " d-none" : "")}>
              Upload back
            </div>
            <Upload
              name="back"
              listType="picture-card"
              className={"avatar-uploader" + (view === "1" ? " d-none" : "")}
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChangeBack}
            >
              {img2.imageUrl ? (
                <img
                  src={img2.imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        )}
        <div className="postepay--inputs__item">
          <div className="label">Importo</div>
          <input
            type="text"
            value={formData.importo}
            onChange={(e) =>
              setFormData({
                ...formData,
                importo: e.target.value,
              })
            }
          />
        </div>
        <div className="postepay--inputs__item">
          <div className="label"> COD FISC INTESTATARIO</div>
          <input
            type="text"
            value={formData.codiceInt}
            onChange={(e) =>
              setFormData({
                ...formData,
                codiceInt: e.target.value,
              })
            }
          />
        </div>
        <div className="postepay--inputs__item">
          <div className="label"> Ordinante</div>
          <input
            type="text"
            value={formData.ordinanted || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                ordinanted: e.target.value,
              })
            }
          />
        </div>
        <div className="postepay--inputs__item">
          <div className="label">COD FISC ORDINANTE</div>
          <input
            type="text"
            value={formData.codiOrdinante || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                codiOrdinante: e.target.value,
              })
            }
          />
        </div>
        <div className="postepay--inputs__item">
          <div className="label">Numero PostePay</div>
          <input
            type="text"
            value={formData.nrPPay || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                nrPPay: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="bolletini--condition">
        <div className="bolletini--condition__check">
          <label htmlFor="bollo">
            La persona che hai di fronte non è il intestatario del pagamento del
            bollo
          </label>

          <input id="bollo" type="checkbox" />
          <div></div>
        </div>
        <div className="bolletini--condition__orario">
          <span>ORARI DI SERVIZIO</span>
          <div>Tutti i giorni dalle ore 6:00 alle ore 00:30</div>
        </div>
        <div className="bolletini--condition__warning">
          <span>
            Attenzione! I Bolli Auto delle regioni Friuli-Venezia Giulia, Veneto
            e Sardegna non sono al momento Pagabili.
          </span>
        </div>
      </div>

      <div className="bolletini--buttons">
        <button
          className={`${postePayLoading ? "disable" : ""}`}
          onClick={() => {
            setPostePayLoading(true);
            getPostePay(
              "RPP001",
              formData.importo,
              selectedUser.id,
              intestatario,
              formData.codiceInt,
              formData.ordinanted,
              formData.codiOrdinante,
              formData.nrPPay,
              formData.document_type,
              img1.imageUrl,
              img2.imageUrl,
              () => {},
              setPostePayLoading
            );
          }}
        >
          Esegui <i className="fal fa-check" aria-hidden="true"></i>
        </button>
        <button className="disable">Prenota</button>
        <button className="disable">Stampa</button>
        <button
          onClick={() => {
            setService(null);
            setPostePay({});
          }}
        >
          Anulla <i className="fal fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default connect(
  ({
    main: { services, userListBySearch },
    auth: { postePayLoading, postePay },
  }) => {
    return {
      services,
      postePayLoading,
      postePay,
      userList: userListBySearch,
    };
  },
  { ...AuthActions, ...MainActions }
)(PostePay);
