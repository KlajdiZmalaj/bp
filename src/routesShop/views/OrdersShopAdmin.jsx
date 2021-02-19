// import React, { Fragment } from "react";
// import { Header, Azioni } from "shared-components";
// import OrdersShopDomain from "../domains/OrdersShopAdminDomain/index.jsx";

// const OrdersShopAdmin = () => (
//   <Fragment>
//     <Header />
//     <Azioni activeMain="contabilita" active="orders-shop" />
//     <OrdersShopDomain />
//   </Fragment>
// );

// export default OrdersShopAdmin;

import React from "react";
// import Tranzacioni from "./Transazioni";
import AdminPanelDom from "routes/domains/adminPanel/adminPanelDom";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import OrdersShopDomain from "../domains/OrdersShopAdminDomain/index.jsx";

class OrdersShopAdmin extends React.Component {
  componentDidMount() {
    this.props.setActiveSkinId(1);
  }
  componentDidUpdate() {
    if (this.props.activeSkinId === -1) {
      this.props.setActiveSkinId(1);
    }
  }
  render() {
    return (
      <AdminPanelDom
        component={
          <OrdersShopDomain
            forAdmin={true}
            activeSkinId={this.props.activeSkinId}
          ></OrdersShopDomain>
        }
        // component={
        //   <Tranzacioni forAdmin={true} activeSkinId={this.props.activeSkinId} />
        // }
        {...this.props}
      />
    );
  }
}
const mapStatToProps = (state) => ({
  activeSkinId: state.main.activeSkinId,
});
export default connect(mapStatToProps, MainActions)(OrdersShopAdmin);
