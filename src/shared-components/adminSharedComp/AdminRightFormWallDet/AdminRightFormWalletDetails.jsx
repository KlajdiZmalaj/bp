import React, { useState } from "react";
import AuthActions from "redux-store/models/auth";
import MainActions from "redux-store/models/main";

import { connect } from "react-redux";
import SearchSelect from "./SearchSelect";
import "./aRFWD.css";
function FindId(object, filterValue) {
  for (let i = 0; i < object.length; i++) {
    if (object[i].username == filterValue) {
      return object[i].id;
    }
  }
  return -1;
}
const AdminRightFormWalletDetailsHelper = ({
  handleDepositoVisibility,
  handleDebitoVisibility,
  depositoActiveVisibility,
  addebitoActiveVisibility,
  UsersToSearch,
  setDepositoModalAdmin,
  Close,
}) => {
  const [closeSelect, setcloseSelect] = useState(false);
  const [userKey, setUserKey] = useState("");
  const [amount, setAmount] = useState("");
  const [tickOrX, setTickOrX] = useState(true);
  return (
    <div
      className="AdminRightForm--Box--Wallet--Dropdown"
      onClick={() => {
        setcloseSelect(true);
      }}
    >
      <div className="AdminRightForm--Box--Wallet--Dropdown--ChoseButtons">
        <button
          onClick={handleDepositoVisibility}
          className={`${depositoActiveVisibility === true ? "active" : ""}`}
        >
          DEPOSITO{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="7"
            viewBox="0 0 11 7"
          >
            <path className="a" d="M5.5,0,11,7H0Z" />
          </svg>
        </button>
        <button
          onClick={handleDebitoVisibility}
          className={`${addebitoActiveVisibility === true ? "active" : ""}`}
        >
          ADDEBITO{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="7"
            viewBox="0 0 11 7"
          >
            <path className="a" d="M5.5,0,11,7H0Z" />
          </svg>
        </button>
      </div>
      <div className="InputHolder">
        <SearchSelect
          UsersToSearch={UsersToSearch}
          closeSelect={closeSelect}
          userKey={userKey}
          handleChange={(e) => {
            setUserKey(e.target.value);
          }}
        />{" "}
      </div>

      <div className="InputHolder">
        <input
          placeholder="SOMMA"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
        />
        <span>&euro;</span>
      </div>
      <div className="InputHolder">
        <input
          placeholder="NOTIFICA ALL’USER"
          readOnly
          style={{ cursor: "inherit" }}
        />
        <i
          style={{ cursor: "pointer", color: "#00ac5c" }}
          className={`${tickOrX ? "far fa-check" : "fas fa-times"}`}
          onClick={() => {
            setTickOrX(!tickOrX);
          }}
        ></i>
      </div>

      <button
        className="AdminRightForm--Box--Wallet--Dropdown--Submit"
        onClick={async () => {
          await setDepositoModalAdmin({
            depositoModalVis: true,
            type: depositoActiveVisibility ? "deposit" : "withdraw",
            username: userKey,
            id: FindId(UsersToSearch, userKey),
            amount: parseInt(amount),
          });
          if (Close) {
            await Close();
          }
        }}
      >
        {`${depositoActiveVisibility ? "DEPOSITO" : "ADDEBITO"}`}
      </button>
    </div>
  );
};
class AdminRightFormWalletDetails extends React.Component {
  componentWillUnmount() {
    if (this.props.ModalOrNo) {
      this.props.Close({ visibility: false, data: "" });
    }
  }
  returnAllUsers = (users) => {
    let allUsers = [...users];
    users.forEach((user) => {
      if (user?.children && user?.children.length >= 0) {
        user.children.forEach((child) => {
          allUsers.push(child);
          if (child?.children && child?.children.length >= 0) {
            let arrayToGet = this.checkIfHaveMoreUsers(child.children);
            if (arrayToGet.length >= 0) {
              arrayToGet.forEach((element) => {
                allUsers.push(element);
              });
            }
          }
        });
      }
    });
    return allUsers;
  };

  checkIfHaveMoreUsers = (users) => {
    let allUsers = [...users];
    users.forEach((user) => {
      if (user?.children && user?.children.length >= 0) {
        user.children.forEach((child) => {
          allUsers.push(child);
          if (child?.children && child?.children.length >= 0) {
            let arrayToGet = this.returnAllUsers(child.children);
            if (arrayToGet.length >= 0) {
              arrayToGet.forEach((element) => {
                allUsers.push(element);
              });
            }
          }
        });
      }
    });
    return allUsers;
  };

  componentDidMount() {
    if (
      !window.location.href.includes("utenti") &&
      this.props.ModalOrNo === true
    ) {
      if (this.props.activeSkinId === -1) {
        this.props.getUsers(
          null,
          {
            skin_id: 1,
          },
          25,
          1
        );
      } else {
        this.props.getUsers(
          null,
          {
            skin_id: this.props.activeSkinId,
            backoffice: true,
          },
          25,
          1
        );
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (
      !window.location.href.includes("utenti") &&
      this.props.ModalOrNo === true
    ) {
      if (this.props.activeSkinId != prevProps.activeSkinId) {
        this.props.getUsers(
          null,
          {
            skin_id: this.props.activeSkinId,
            backoffice: true,
          },
          25,
          1
        );
      }
    }
  }
  render() {
    const { userList } = this.props;
    const UsersToSearch = userList
      ? [...new Set(this.returnAllUsers(userList))]
      : [];
    const {
      handleDepositoVisibility,
      handleDebitoVisibility,
      depositoActiveVisibility,
      addebitoActiveVisibility,
      ModalOrNo,
      Close,
      setDepositoModalAdmin,
      menuSkinVisible,
    } = this.props;
    return (
      <React.Fragment>
        {ModalOrNo === true ? (
          <div
            className={`${
              !menuSkinVisible ? "RightFormModal Big" : "RightFormModal"
            }`}
          >
            <div
              className="backDrop"
              onClick={() => {
                Close({ visibility: false, data: "" });
              }}
            ></div>

            <div
              className="Close"
              onClick={() => {
                Close({ visibility: false, data: "" });
              }}
            >
              <i className="fal fa-times"></i>
            </div>
            <div className="Header">Deposito / Addebito</div>

            <AdminRightFormWalletDetailsHelper
              handleDepositoVisibility={handleDepositoVisibility}
              handleDebitoVisibility={handleDebitoVisibility}
              depositoActiveVisibility={depositoActiveVisibility}
              addebitoActiveVisibility={addebitoActiveVisibility}
              UsersToSearch={UsersToSearch}
              setDepositoModalAdmin={setDepositoModalAdmin}
              Close={() => {
                Close({ visibility: false, data: "" });
              }}
            />
          </div>
        ) : (
          <AdminRightFormWalletDetailsHelper
            setDepositoModalAdmin={setDepositoModalAdmin}
            handleDepositoVisibility={handleDepositoVisibility}
            handleDebitoVisibility={handleDebitoVisibility}
            depositoActiveVisibility={depositoActiveVisibility}
            addebitoActiveVisibility={addebitoActiveVisibility}
            UsersToSearch={UsersToSearch}
          />
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.main.userList.users,
  activeSkinId: state.main.activeSkinId,
});
export default connect(mapStateToProps, { ...AuthActions, ...MainActions })(
  AdminRightFormWalletDetails
);
