import React, { Fragment } from "react";
import "./adminServizi.css";
import AdminServiziItem from "./AdminServiziItem";
import AuthAction from "redux-store/models/auth";
import { connect } from "react-redux";
class AdminServizi extends React.Component {
  componentDidMount() {
    this.props.getAllServices(this.props.activeSkinId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.activeSkinId != prevProps.activeSkinId) {
      this.props.getAllServices(this.props.activeSkinId);
    }
  }
  render() {
    const { allServices, servicesLoader } = this.props;
    return (
      <Fragment>
        {servicesLoader === true ? (
          <div className="loaderAdmin">Loading...</div>
        ) : (
          <div className="AdminServizi">
            {allServices?.companies && Array.isArray(allServices?.companies) ? (
              allServices.companies.map((itemList, i) => (
                <AdminServiziItem {...itemList} key={`${itemList.number_id}`} />
              ))
            ) : (
              <div className="NoData">
                <i className="fal fa-info-circle"></i>
                <span>No Data</span>
              </div>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  activeSkinId: state.main.activeSkinId,
  allServices: state.auth.allServices,
  servicesLoader: state.auth.servicesLoader,
});
export default connect(mapStateToProps, { ...AuthAction })(AdminServizi);
