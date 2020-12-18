import React, { Fragment } from "react";
import "./adminServizi.css";
import AdminServiziItem from "./AdminServiziItem";
import AuthAction from "redux-store/models/auth";
import MainAction from "redux-store/models/main";
import { connect } from "react-redux";
class AdminServizi extends React.Component {
  state = { activeCategory: -1 };
  componentDidMount() {
    if (this.props.activeSkinId === -1) {
      this.props.setActiveSkinId(1);
    }
    this.props.getAllServices(this.props.activeSkinId);
  }
  async componentDidUpdate(prevProps) {
    if (this.props.activeSkinId === -1) {
      await this.props.setActiveSkinId(1);
    }
    if (this.props.activeSkinId !== prevProps.activeSkinId) {
      await this.props.getAllServices(
        this.props.activeSkinId === -1 ? 1 : this.props.activeSkinId
      );
    }
  }
  render() {
    const {
      allServices,
      servicesLoader,
      activeSkinId,
      UpdateServicesChangeStatus,
    } = this.props;
    const { activeCategory } = this.state;
    return (
      <Fragment>
        {servicesLoader === true ? (
          <div className="loaderAdmin">Loading...</div>
        ) : (
          <div className="d-flex flex-column w-100">
            <div className="AdminServiziCategories">
              <div
                onClick={() => this.setState({ activeCategory: -1 })}
                className={
                  "AdminServiziCategories__item" +
                  (activeCategory === -1 ? " active" : "")
                }
              >
                Tutti
              </div>
              {(allServices?.categories || []).map((category) => (
                <div
                  key={category.number_id}
                  className={
                    "AdminServiziCategories__item" +
                    (activeCategory === category.number_id ? " active" : "")
                  }
                  data-id={category.name}
                  onClick={() =>
                    this.setState({ activeCategory: category.number_id })
                  }
                >
                  {category.full_name}
                </div>
              ))}
            </div>
            <div className="AdminServizi">
              {allServices?.companies &&
              Array.isArray(allServices?.companies) ? (
                allServices.companies.map(
                  (itemList, i) =>
                    (itemList.category_id === activeCategory ||
                      activeCategory === -1) && (
                      <AdminServiziItem
                        {...itemList}
                        key={`${itemList.number_id}`}
                        UpdateServicesChangeStatus={UpdateServicesChangeStatus}
                        activeSkinId={activeSkinId}
                        getService={() => {
                          this.props.getAllServices(this.props.activeSkinId);
                        }}
                      />
                    )
                )
              ) : (
                <div className="NoData">
                  <i className="fal fa-info-circle"></i>
                  <span>No Data</span>
                </div>
              )}
            </div>
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
export default connect(mapStateToProps, { ...AuthAction, ...MainAction })(
  AdminServizi
);
