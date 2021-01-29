import React, { Fragment } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import "./Dashboard.css";
import images from "themes/images";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import CompaniesCheck from "./CompaniesCheck";
import { debounce, flatten } from "lodash";
class DashboardDom extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }
  state = {
    Companies: [],
    search: "",
    menuClassName: "notFixed",
    toDisplay: false,
    categoriesTypeSelected: "RTELD",
    categoryActive: "RTELC",
    snap: false,
  };
  togglePopUp = (val) => {
    this.setState({ toDisplay: val });
  };
  changeServce = async (serviceId, services, serviceName, type, special) => {
    if (type === "fav") {
    } else {
      await this.props.setServiceType(this.state.categoriesTypeSelected);
    }

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
    const { services, favorites, match } = await this.props;
    if (favorites !== nextProps.favorites) {
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
        CompaniesFav: CompaniesFav,
      });
    }

    if (services !== nextProps.services || match.url !== nextProps.match.url) {
      let Categories = await this.FindArrayOfServicesByValue(
        services,
        match.params.id
      );

      let Companies = {};
      Companies = await this.FindServ(Categories, Companies);
      let doesCategoryExist = false;
      const categoryActive = this.state.categoryActive;
      let findCategoryByKey = "";
      Categories.forEach((cat) => {
        if (categoryActive && categoryActive === cat?.key) {
          doesCategoryExist = true;
          findCategoryByKey = cat.name;
        }
      });
      const CatActiveForState =
        categoryActive && !doesCategoryExist
          ? Categories[0]?.key
          : categoryActive
          ? categoryActive
          : Categories[0]?.key;
      const CompanieCategoryForState =
        categoryActive && !doesCategoryExist
          ? Categories[0]?.name
          : findCategoryByKey
          ? findCategoryByKey
          : Categories[0]?.name;

      await this.setState({
        Companies: Companies[CompanieCategoryForState],
        Categories: Categories,
        categoryActive: CatActiveForState,
        categoriesTypeSelected: CatActiveForState,
      });
    }
  }
  FilterCompanies = (Companies, search) => {
    const FilterCompanies = [];
    let pushed = false;
    if (search === "" || !search || !Companies) {
      return Companies;
    } else {
      Companies.map((comp) =>
        Object.keys(comp).forEach((key) => {
          if (key === "BOLL") {
            comp[key].services.forEach((service) => {
              if (
                pushed === false &&
                this.compareIfAreSimilar(service.name, search)
              ) {
                pushed = true;
                FilterCompanies.push(comp);
              }
            });
          } else {
            if (this.compareIfAreSimilar(comp[key].name, search)) {
              FilterCompanies.push(comp);
            }
          }
        })
      );
    }
    return FilterCompanies;
  };
  compareIfAreSimilar = (firstWord, secondWord) => {
    let similar = true;
    if (firstWord && secondWord && secondWord !== "") {
      let newFWord = this.removeDuplicate(
        firstWord.toLowerCase().replace(" ", "")
      );
      let newSWord = this.removeDuplicate(
        secondWord.toLowerCase().replace(" ", "")
      );

      if (newFWord.includes(newSWord)) {
        similar = true;
      } else {
        similar = false;
      }
    }
    return similar;
  };
  removeDuplicate = (str) => {
    let last = "";
    let result = "";
    for (let i = 0; i < str.length; i++) {
      let char = str.charAt(i);
      if (char !== last) {
        result += char;
        last = char;
      }
    }
    return result;
  };
  checkIfInlcudes = (mainWord, WordToCheck) => {
    return (
      mainWord
        .toString()
        .toLowerCase()
        .includes(WordToCheck.toString().toLowerCase()) ||
      WordToCheck.toString()
        .toLowerCase()
        .includes(mainWord.toString().toLowerCase())
    );
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if (this.props.accountInfo?.token) {
      let catInst = document.querySelector(".Dashboard > .Categories");
      catInst.style.height =
        catInst.getBoundingClientRect().height -
        (catInst.getBoundingClientRect().height +
          186 -
          document.querySelector("footer").getBoundingClientRect().y) +
        "px";
      const { menuClassName } = this.state;
      let scrollPoint = document
        .querySelector("#SpecStatistich")
        ?.classList?.contains("min")
        ? 386
        : 486;
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
  FindArrayOfServicesByValue = (object, value = "ricariche", isSearching) => {
    if (!this.props.accountInfo?.profile?.role) {
      if (value !== "ricariche") {
        this.props.history.push("/dashboard/ricariche");
        message.info("Per favore fai prima il log in.");
      }
    }
    if (isSearching) {
      return (
        Object.keys(object) &&
        Array.isArray(Object.keys(object)) &&
        Object.keys(object).map((key) => ({ ...object[key], key }))
      );
    } else {
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
    }
  };
  FindServ = (Categories, Companies) => {
    Object.keys(Categories).forEach((id) => {
      Companies[Categories[id].name] = [
        ...Object.keys(Categories[id])
          .filter(
            (key) =>
              key !== "name" &&
              key !== "group" &&
              key !== "key" &&
              key !== "favourite"
          )
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
    // console.log("CategoryName", CategoryName, CategoryType);
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
      categoryActive,
      categoriesTypeSelected,
    } = this.state;
    const { accountInfo } = this.props;
    const isSepaUser =
      accountInfo.profile.username === "sepaagency" ||
      accountInfo.profile.username === "sepa_user";
    const isTestAcc =
      accountInfo.profile.username === "mynewagency" &&
      accountInfo.profile.role.name === "agency" &&
      accountInfo.profile.role.id === 11;
    // console.log("Companies", Companies);
    const debounceSearch = debounce(async () => {
      await this.setState({
        search: this.searchRef?.current?.value,
      });
    }, 300);
    return (
      <div className="DContainer maxWidth">
        <div className={`Image  ${menuClassName}`}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={images["baner_servizi_header"]} />
        </div>
        <div className={`Dashboard ${menuClassName}`}>
          <aside className={`Categories ${menuClassName}`}>
            <div className="First">SERVIZI</div>
            {Categories &&
              Array.isArray(Categories) &&
              Categories.map((cat) => (
                <div
                  className={`${categoryActive === cat.key ? "active" : ""}`}
                  onClick={() => {
                    this.ChangeCompanies(cat.name, cat.key);
                    this.setState({ categoryActive: cat.key });
                  }}
                  key={cat?.key}
                  data-cat={`${cat.key}`}
                >
                  {cat.name}
                </div>
              ))}
            <div className="Last">
              <img
                src={images["servizi_banner"]}
                onClick={() => {
                  window.location.hash = "products";
                }}
              />
            </div>
          </aside>
          <div className={`CompaniesAndOther ${menuClassName}`}>
            {this.props.accountInfo?.profile?.role && (
              <div className="Favorites">
                {CompaniesFav &&
                Array.isArray(CompaniesFav) &&
                CompaniesFav.length >= 1 ? (
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
                              className={`${
                                id === "BOLL" ||
                                id === "BOLMR" ||
                                id === "PPA" ||
                                id === "RCPP"
                                  ? "Pagamenti"
                                  : ""
                              }`}
                              onClick={async (e) => {
                                if (e.target.tagName !== "I") {
                                  // console.log("clicked", comp);
                                  this.props.setServiceType(comp.key);
                                  if (id === "BOLL") {
                                    window.location.hash =
                                      "dashboard/pagamenti";
                                  } else {
                                    this.changeServce(
                                      id,
                                      comp.companies[key][id].services,
                                      comp.companies[key][id].name,
                                      "fav"
                                    );
                                    this.togglePopUp(true);
                                  }
                                }
                              }}
                            >
                              <img src={images[id]} alt={id} />
                              <span> {comp.companies[key][id].name}</span>
                              <i
                                id={`${id}`}
                                onClick={async () => {
                                  await this.props.toggleFavorite(id, "remove");
                                  await setTimeout(() => {
                                    this.props.getFavorites();
                                    this.props.getServices();
                                  }, 200);
                                }}
                                className={`fal fa-star favourite`}
                              ></i>
                            </div>
                          ))
                      )
                  )
                ) : (
                  <div className="NF">No Preferiti</div>
                )}
              </div>
            )}

            <div className="Comp">
              <div className="Search">
                <input
                  type="text"
                  placeholder="Search Here"
                  ref={this.searchRef}
                  onFocus={() => {
                    this.setState({
                      Companies: flatten(
                        Object.values(
                          this.FindServ(
                            this.FindArrayOfServicesByValue(
                              this.props.services,
                              "",
                              true
                            ),
                            {}
                          )
                        )
                      ),
                    });
                  }}
                  onChange={debounceSearch}
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
                      Object.keys(comp).map((key, i) => {
                        return comp[key].services[0].service_id === "BOL001" ? (
                          comp[key].services.map((service) => {
                            return (
                              this.compareIfAreSimilar(
                                service.name,
                                search
                              ) && (
                                <CompaniesCheck
                                  key={service.service_id}
                                  Key={key}
                                  changeServce={() => {
                                    this.changeServce(
                                      key,
                                      comp[key].services,
                                      comp[key].name,
                                      "",
                                      service
                                    );
                                  }}
                                  image={
                                    service.service_id === "BOL006" ||
                                    service.service_id === "PPA001" ||
                                    service.service_id === "PAGF24"
                                      ? `${service.service_id}-Black-Mobile`
                                      : `BOLL-Black-Mobile`
                                  }
                                  role={this.props.accountInfo?.profile?.role}
                                  togglePopUp={this.togglePopUp}
                                  setState={() => {
                                    this.setState({
                                      Services: comp[key].services,
                                      serviceSelected: comp[key].services[0],
                                    });
                                  }}
                                  Companie={service}
                                  favourite={comp[key].favourite}
                                  toggleFavorite={this.props.toggleFavorite}
                                  getServices={this.props.getServices}
                                  editClass={
                                    key === "BOLL" ||
                                    key === "BOLMR" ||
                                    key === "PPA" ||
                                    key === "RCPP"
                                      ? "Pagamenti"
                                      : ""
                                  }
                                />
                              )
                            );
                          })
                        ) : comp[key].services[0].service_id ===
                            "BGM001-remove_me" &&
                          (this.props.accountInfo?.profile?.role?.name !==
                            "super_admin" ||
                            this.props.accountInfo?.profile?.name !==
                              "johny cash") ? null : (
                          <CompaniesCheck
                            key={comp[key]?.services[0]?.service_id}
                            Key={key}
                            changeServce={() => {
                              this.changeServce(
                                key,
                                comp[key].services,
                                comp[key].name
                              );
                            }}
                            role={this.props.accountInfo?.profile?.role}
                            togglePopUp={this.togglePopUp}
                            setState={() => {
                              this.setState({
                                Services: comp[key].services,
                                serviceSelected: comp[key].services[0],
                              });
                            }}
                            favourite={comp[key].favourite}
                            Companie={comp[key]}
                            toggleFavorite={this.props.toggleFavorite}
                            getServices={this.props.getServices}
                            editClass={
                              key === "BOLL" ||
                              key === "BOLMR" ||
                              key === "PPA" ||
                              key === "RCPP"
                                ? "Pagamenti"
                                : ""
                            }
                          />
                        );
                      })
                  )}
                {/*Static Services presto Online  */}
                {!isSepaUser && categoriesTypeSelected === "PRDPST" && (
                  <Fragment>
                    <div
                      onClick={() => {
                        if (isTestAcc) {
                          this.changeServce(
                            "PPA001",
                            [{ service_id: "PPA001", name: "Pago Pa" }],
                            "Pago Pa",
                            "1",
                            { service_id: "PPA001", name: "Pago Pa" }
                          );
                          this.togglePopUp(true);
                        }
                      }}
                    >
                      {" "}
                      <h3> Presto Online</h3>
                      <img src={images["PAGO_PA-logo"]} alt="pago_pa" />
                      <span> Pago PA</span>
                    </div>
                    <div
                      onClick={() => {
                        if (isTestAcc) {
                          this.changeServce(
                            "BOL004",
                            [
                              { service_id: "BOL004", name: "MAV" },
                              { service_id: "BOL003", name: "RAV" },
                            ],
                            "MAV/RAV",
                            "1",
                            { service_id: "BOL004", name: "MAV" }
                          );
                          this.togglePopUp(true);
                        }
                      }}
                    >
                      {" "}
                      <h3> Presto Online</h3>
                      <img src={images["BOLLETINO-logo"]} alt="mav_rav" />
                      <span> MAV/RAV</span>
                    </div>
                    <div
                      onClick={() => {
                        if (isTestAcc) {
                          this.changeServce(
                            "BOL006",
                            [{ service_id: "BOL006", name: "BOLO AUTO" }],
                            "BOLO AUTO",
                            "1",
                            { service_id: "BOL006", name: "BOLO AUTO" }
                          );
                          this.togglePopUp(true);
                        }
                      }}
                    >
                      <h3> Presto Online</h3>
                      <img src={images["BOLO_AUTO-logo"]} alt="bolo_auto" />
                      <span> BOLLO AUTO</span>
                    </div>
                    <div
                      onClick={() => {
                        if (isTestAcc) {
                          this.changeServce(
                            "PAGF24",
                            [{ service_id: "PAGF24", name: "F24" }],
                            "F24",
                            "1",
                            { service_id: "PAGF24", name: "F24" }
                          );
                          this.togglePopUp(true);
                        }
                      }}
                    >
                      <h3> Presto Online</h3>
                      <img src={images["f24-logo"]} alt="f24" />
                      <span> F24</span>
                    </div>
                    <div
                      onClick={() => {
                        if (isTestAcc) {
                          this.changeServce(
                            "BOL007",
                            [{ service_id: "BOL007", name: "BOLO FRECCIA" }],
                            "BOLO FRECCIA",
                            "1",
                            { service_id: "BOL007", name: "BOLO FRECCIA" }
                          );
                          this.togglePopUp(true);
                        }
                      }}
                    >
                      <h3> Presto Online</h3>
                      <img src={images["BOLLETINO-logo"]} alt="freccia" />
                      <span> BOLLO FRECCIA</span>
                    </div>
                  </Fragment>
                )}
                {/* End of Statoc Cpde */}
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

export default withRouter(
  connect(mapsStateToProps, { ...MainActions, ...AuthActions })(DashboardDom)
);
