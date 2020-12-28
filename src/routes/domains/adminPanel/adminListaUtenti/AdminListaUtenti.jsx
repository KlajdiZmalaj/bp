import React from "react";
import "./adminListaUtenti.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import MainActions from "redux-store/models/main";
import { connect } from "react-redux";
import moment from "moment";
import { Select, Pagination } from "antd";

const { Option } = Select;
class AdminListaUtenti extends React.Component {
  state = {
    perPage: 25,
    page_number: 1,
  };
  componentDidMount() {
    const Special =
      this.props.activeSkinId === -1 &&
      this.props.accountInfo?.profile?.role?.name !== "support";
    if (Special) {
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
  componentDidUpdate(prevProps) {
    if (this.props.activeSkinId !== prevProps.activeSkinId) {
      const Special =
        this.props.activeSkinId === -1 &&
        this.props.accountInfo?.profile?.role?.name !== "support";
      if (Special) {
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
  SortArrayByDate(Array, Order) {
    const newArray = [...Array];
    if (Order === "Desc") {
      newArray.sort((a, b) =>
        moment(
          a.last_login_time === "-" ? "01-01-2300 00:00:00" : a.last_login_time,
          "DD-MM-YYYY HH:mm:ss"
        ).diff(
          moment(
            b.last_login_time === "-"
              ? "01-01-2300 00:00:00"
              : b.last_login_time,
            "DD-MM-YYYY HH:mm:ss"
          )
        )
      );
    } else {
      newArray.sort((a, b) =>
        moment(
          b.last_login_time === "-" ? "01-01-1800 00:00:00" : b.last_login_time,
          "DD-MM-YYYY HH:mm:ss"
        ).diff(
          moment(
            a.last_login_time === "-"
              ? "01-01-1800 00:00:00"
              : a.last_login_time,
            "DD-MM-YYYY HH:mm:ss"
          )
        )
      );
    }
    return newArray;
  }

  render() {
    const {
      userList,
      LoaderAU,
      screenWidth,
      activeSkinId,
      accountInfo,
      total_pages,
    } = this.props;
    const { perPage, page_number } = this.state;
    const Special =
      activeSkinId === -1 && accountInfo?.profile?.role?.name !== "support";
    return (
      <div className="AdminListaUtenti">
        <div className="AdminListaUtenti--Header">
          <span>ID Utente</span>
          <span
            className={`${Special && screenWidth < 1024 ? "SpecSm" : ""}`}
            style={screenWidth <= 850 && Special ? { left: "7%" } : {}}
          >
            Nome Utente
          </span>
          <span
            className={`${
              Special && screenWidth < 1024 ? "SpecSm" : Special ? "none" : ""
            }`}
            style={
              Special && screenWidth <= 1440
                ? {
                    width: "calc(43.5% - 230px)",
                    left: "0.2%",
                    marginLeft: "1%",
                  }
                : Special
                ? {
                    width: "calc(36.5% - 230px)",
                    marginLeft: "1%",
                    left: "0.2%",
                  }
                : screenWidth > 1440
                ? {
                    width: "calc(36.5% - 230px)",
                    left: "-0.8%",
                  }
                : {
                    width: "calc(36.5% - 230px)",
                    left: "0.5%",
                  }
            }
          >
            {screenWidth >= 1024 && screenWidth <= 1080
              ? "Rag Sociale"
              : "Ragione Sociale"}
          </span>
          <span
            className={`${Special && screenWidth < 1024 ? "SpecSm" : ""}`}
            style={
              screenWidth >= 2000 && !Special
                ? {
                    width: "4%",
                    justifyContent: "flex-end",
                    marginRight: "1.5%",
                    left: "1%",
                  }
                : screenWidth <= 400 && Special
                ? { paddingLeft: "8%" }
                : screenWidth <= 500 && Special
                ? { paddingLeft: "10%" }
                : screenWidth <= 550 && Special
                ? { paddingLeft: "12%" }
                : screenWidth <= 850 && Special
                ? { justifyContent: "flex-end", left: "-3%" }
                : Special
                ? {
                    width: "7.5%",
                    justifyContent: "flex-end",
                    marginRight: "1%",
                  }
                : {
                    width: "4%",
                    justifyContent: "flex-end",
                    marginRight: "0.8%",
                  }
            }
          >
            Credito
          </span>
          {Special ? null : (
            <span style={{ width: "7%", left: "0" }}>Città</span>
          )}
          <span
            style={
              Special
                ? { width: "13%", justifyContent: "center", left: 0 }
                : { width: "13%", justifyContent: "center", left: 0 }
            }
            className={`${
              Special && screenWidth < 1024 ? "SpecSm" : Special ? "none" : ""
            }`}
          >
            Ultimo Deposito
          </span>
          <span
            className={`${Special ? "none" : ""}`}
            style={
              !Special && screenWidth <= 850
                ? { justifyContent: "center", left: 0, display: "none" }
                : Special
                ? { width: "18%", justifyContent: "center", marginRight: "1%" }
                : { width: "13%", justifyContent: "center", left: 0 }
            }
          >
            Ultimo Login
          </span>
          <span
            style={{ width: "210px", justifyContent: "flex-start" }}
            className={`${Special ? "activated" : ""}`}
          >
            Operazioni
          </span>
        </div>
        <div className="AdminListaUtentiRow">
          {LoaderAU && LoaderAU === true ? (
            <div className="loaderAdmin">Loading...</div>
          ) : userList && Array.isArray(userList) && userList.length >= 1 ? (
            userList.map((itemList, i) => {
              return (
                <AdminListaUtentiRow
                  itemList={itemList}
                  key={itemList.id + i}
                  perPage={perPage}
                  page_number={page_number}
                />
              );
            })
          ) : (
            <div className="NoData">
              <i className="fal fa-info-circle"></i>
              <span>No Data</span>
            </div>
          )}
        </div>
        <div className="paginationWrapper">
          <Pagination
            onChange={(e) => {
              this.setState({ page_number: e });
              this.props.getUsers(
                null,
                {
                  skin_id: this.props.activeSkinId,
                  backoffice: true,
                },
                perPage,
                e
              );
            }}
            total={total_pages ? total_pages * 10 : 10}
          />
          <Select
            defaultValue={25}
            onChange={(e) => {
              this.setState({ perPage: parseInt(e), clickedPage: 1 }, () => {
                this.props.getUsers(
                  null,
                  {
                    skin_id: this.props.activeSkinId,
                    backoffice: true,
                  },
                  e,
                  page_number
                );
              });
            }}
            value={this.state.perPage}
          >
            <Option value={10}>10 / Pagina</Option>
            <Option value={25}>25 / Pagina</Option>
            <Option value={50}>50 / Pagina</Option>
          </Select>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.main.userList.users,
  total_pages: state.main.userList.total_pages,
  LoaderAU: state.main.LoaderAU,
  screenWidth: state.main.screenWidth,
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps, { ...MainActions })(AdminListaUtenti);
