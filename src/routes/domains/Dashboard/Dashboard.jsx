import React from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import "./Dashboard.css";
import images from "themes/images";
class DashboardDom extends React.Component {
  state = {
    Companies: [],
    search: "",
    menuClassName: "notFixed",
    toDisplay: false,
    categoriesTypeSelected: "RTELD",
    categoriesFavTypeSelected: "RTELD",
  };
  togglePopUp = (val) => {
    this.setState({ toDisplay: val });
  };
  changeServce = async (serviceId, services, serviceName, type, special) => {
    await this.props.setServiceType(
      type === "fav"
        ? this.state.categoriesFavTypeSelected
        : this.state.categoriesTypeSelected
    );
    await this.props.setServiceId(special ? special : services[0]);
    await this.props.setServiceS({
      name: serviceName,
      id: serviceId,
      services: services,
    });
    await this.props.togglePopUp(true);
  };
  componentDidMount() {
    this.props.getServices();
    this.props.getFavorites();
    window.addEventListener("scroll", this.handleScroll);
  }
  async componentDidUpdate(nextProps) {
    const { services, favorites } = await this.props;
    if (favorites != nextProps.favorites) {
      const CategoriesFav = await this.FindArrayOfServicesByValue(
        favorites,
        ""
      );
      let CompaniesFav = await {};
      CompaniesFav = await this.FindServ(CategoriesFav, CompaniesFav);
      CompaniesFav = await CategoriesFav.map((cat) => {
        return { key: cat.key, companies: CompaniesFav[cat.name] };
      });
      this.setState({
        CompaniesFav,
      });
    }
    if (services != nextProps.services || this.props.match != nextProps.match) {
      let Categories = await this.FindArrayOfServicesByValue(
        services,
        this.props.match.params.id
      );

      let Companies = {};
      Companies = await this.FindServ(Categories, Companies);

      await this.setState({
        Companies: Companies[Categories[0]?.name],
        Categories: Categories,
        categoriesTypeSelected: Categories[0]?.key,
      });
    }
  }
  FilterCompanies = (Companies, search) => {
    const FilterCompanies = [];
    if (search === "" || !search || !Companies) {
      return Companies;
    } else {
      Companies.map((comp) =>
        Object.keys(comp).forEach((key) => {
          if (comp[key].name.toLowerCase().includes(search.toLowerCase())) {
            FilterCompanies.push(comp);
          }
        })
      );
    }
    return FilterCompanies;
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const { menuClassName } = this.state;
    let scrollPoint = document
      .querySelector("#SpecStatistich")
      ?.classList?.contains("min")
      ? 174
      : 357;
    let top =
      (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    if (menuClassName !== "fixed" && top >= scrollPoint) {
      this.setState({
        menuClassName: "fixed",
      });
    } else if (menuClassName === "fixed" && top < scrollPoint) {
      this.setState({
        menuClassName: "notFixed",
      });
    }
  };
  SplitAndCheckIfIncludes = (name, listOfOptions) => {
    let response = false;
    if (name) {
      let newlistOfOptions = listOfOptions.split(",");
      newlistOfOptions.forEach((option) => {
        if (name.includes(option) || name === option) {
          response = true;
          return response;
        }
      });
      return response;
    }
    return response;
  };
  //value = "ricariche" default , se root /dashboard only jep error
  FindArrayOfServicesByValue = (object, value = "ricariche") => {
    return (
      Object.keys(object) &&
      Array.isArray(Object.keys(object)) &&
      Object.keys(object)
        .filter((key) =>
          this.SplitAndCheckIfIncludes(
            object[key]?.group?.toLowerCase(),
            value.toLowerCase()
          )
        )
        .map((key) => ({ ...object[key], key }))
    );
  };
  FindServ = (Categories, Companies) => {
    Object.keys(Categories).forEach((id) => {
      Companies[Categories[id].name] = [
        ...Object.keys(Categories[id])
          .filter((key) => key != "name" && key != "group" && key != "key")
          .map((key) => ({
            [key]: {
              ...Categories[id][key],
            },
          })),
      ];
    });
    return Companies;
  };
  ChangeCompanies = (CategoryName, CategoryType) => {
    this.setState((state) => ({
      Companies: this.FindServ(state.Categories, state.Companies)[CategoryName],
      categoriesTypeSelected: CategoryType,
    }));
  };
  render() {
    const {
      Categories,
      menuClassName,
      search,
      CompaniesFav,
      Companies,
      Services,
    } = this.state;
    return (
      <div className="DContainer">
        <div className={`Image  ${menuClassName}`}></div>
        {menuClassName === "fixed" && (
          <div className={`Categories ${menuClassName}`}>
            <div className="First">SERVIZI</div>
            {Categories &&
              Array.isArray(Categories) &&
              Categories.map((cat) => (
                <div
                  onClick={() => this.ChangeCompanies(cat.name, cat.key)}
                  key={cat.key}
                >
                  {cat.name.charAt(0).toUpperCase() +
                    cat.name.slice(1).toLowerCase()}
                </div>
              ))}
            <div className="Last"></div>
          </div>
        )}
        <div className={`Dashboard ${menuClassName}`}>
          {menuClassName === "notFixed" && (
            <div className={`Categories ${menuClassName}`}>
              <div className="First">SERVIZI</div>
              {Categories &&
                Array.isArray(Categories) &&
                Categories.map((cat) => (
                  <div
                    onClick={() => this.ChangeCompanies(cat.name, cat.key)}
                    key={cat.key}
                  >
                    {cat.name.charAt(0).toUpperCase() +
                      cat.name.slice(1).toLowerCase()}
                  </div>
                ))}
              <div className="Last"></div>
            </div>
          )}
          <div className="CompaniesAndOther">
            <div className="Favorites">
              {CompaniesFav && Array.isArray(CompaniesFav) ? (
                CompaniesFav.map(
                  (comp) =>
                    Object.keys(comp?.companies) &&
                    Array.isArray(Object.keys(comp?.companies)) &&
                    Object.keys(comp?.companies).map(
                      (key) =>
                        Object.keys(comp.companies[key]) &&
                        Array.isArray(Object.keys(comp.companies[key])) &&
                        Object.keys(comp.companies[key]).map((id) => (
                          <div
                            key={id}
                            onClick={() => {
                              this.setState({
                                categoriesFavTypeSelected: comp.key,
                              });
                              this.changeServce(
                                id,
                                comp.companies[key][id].services,
                                comp.companies[key][id].name,
                                "fav"
                              );
                              this.togglePopUp(true);
                            }}
                          >
                            <img src={images[id]} alt="" />
                            <span> {comp.companies[key][id].name}</span>
                          </div>
                        ))
                    )
                )
              ) : (
                <div className="NF">No Favourites</div>
              )}
            </div>
            <div className="Comp">
              <div className="Search">
                <input
                  type="text"
                  value={search}
                  placeholder="Search Here"
                  onChange={(e) => {
                    this.setState({
                      search: e.target.value,
                    });
                  }}
                />
                <i className="fal fa-search" />
              </div>
              <div className="Companies">
                {Companies &&
                  Array.isArray(Companies) &&
                  this.FilterCompanies(Companies, search).map(
                    (comp) =>
                      Object.keys(comp) &&
                      Array.isArray(Object.keys(comp)) &&
                      Object.keys(comp).map((key) =>
                        comp[key].services[0].service_id === "BGM001" &&
                        this.props.accountInfo?.profile?.role?.name ===
                          "super_admin" ? (
                          <div
                            key={key}
                            onClick={() => {
                              this.changeServce(
                                key,
                                comp[key].services,
                                comp[key].name
                              );
                              this.togglePopUp(true);
                              this.setState({
                                Services: comp[key].services,
                                serviceSelected: comp[key].services[0],
                              });
                            }}
                          >
                            <img src={images[key]} alt="" />
                            <span> {comp[key].name}</span>
                          </div>
                        ) : comp[key].services[0].service_id === "BOL001" ? (
                          comp[key].services.map((service) => {
                            return (
                              <div
                                key={key}
                                onClick={() => {
                                  this.changeServce(
                                    key,
                                    comp[key].services,
                                    comp[key].name,
                                    "",
                                    service
                                  );
                                  this.togglePopUp(true);
                                  this.setState({
                                    Services: comp[key].services,
                                    serviceSelected: comp[key].services[0],
                                  });
                                }}
                              >
                                <img src={images[key]} alt="" />
                                <span> {service.name}</span>
                              </div>
                            );
                          })
                        ) : comp[key].services[0].service_id != "BGM001" ? (
                          <div
                            key={key}
                            onClick={() => {
                              this.changeServce(
                                key,
                                comp[key].services,
                                comp[key].name
                              );
                              this.togglePopUp(true);
                              this.setState({
                                Services: comp[key].services,
                                serviceSelected: comp[key].services[0],
                              });
                            }}
                          >
                            <img src={images[key]} alt="" />
                            <span> {comp[key].name}</span>
                          </div>
                        ) : null
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  services: state.main.services,
  favorites: state.main.favorites,
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  DashboardDom
);
