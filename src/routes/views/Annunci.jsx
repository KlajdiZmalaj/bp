import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import moment from "moment";

import "antd/dist/antd.css";
import { Form, Input, Button, Radio } from "antd";
import { Azioni, Header, Loader, Modal } from "shared-components";
import images from "themes/images";

const { TextArea } = Input;

class Annunci extends React.Component {
  constructor() {
    super();
    this.state = {
      tabFilter: "",
      expanded: [],
      modal: false,
    };
  }

  hideModal = () => {
    document.body.style.overflow = "";
    this.setState({ modal: false });
  };
  showModal = () => {
    document.body.style.overflow = "hidden";
    this.setState({ modal: true });
  };

  componentDidMount() {
    this.props.getAds();
  }

  selectTab = (payload) => {
    this.setState({ tabFilter: payload });
  };

  tabExpand = (tab) => {
    if (this.state.expanded.includes(tab)) {
      this.setState({
        expanded: this.state.expanded.filter((el) => el !== tab),
      });
    } else {
      this.setState({ expanded: [...this.state.expanded, tab] });
    }
  };

  render() {
    const { ads, ads_loading, accountInfo } = this.props;
    let role = accountInfo.profile && accountInfo.profile.role.name;
    let adsFiltered =
      this.state.tabFilter === ""
        ? Object.values(ads).sort((a, b) => b.id - a.id)
        : Object.values(ads)
            .filter((m) => m.importance === this.state.tabFilter)
            .sort((a, b) => b.id - a.id);
    return (
      <div className="Container">
        <Header></Header>
        {/* <Overview></Overview> */}
        <div className="container-fluid overview ">
          <Azioni activeMain="support" active="annunci"></Azioni>
          <div className="panels-container">
            <div className="sort-annunci max-width">
              <h1 className="heading-tab mr-auto">Annunci</h1>
              <ul className="m-0 p-0">
                <li
                  onClick={() => this.selectTab("")}
                  className={`${this.state.tabFilter === "" ? "active" : ""}`}
                >
                  <span>
                    <i className="fas fa-dot-circle"></i>Tutti
                  </span>
                </li>
                <li
                  onClick={() => this.selectTab("4")}
                  className={`${this.state.tabFilter === "4" ? "active" : ""}`}
                >
                  <span>
                    <i className="fas fa-dot-circle"></i>Privata
                  </span>
                </li>
                <li
                  onClick={() => this.selectTab("3")}
                  className={`${this.state.tabFilter === "3" ? "active" : ""}`}
                >
                  <span>
                    <i className="fas fa-dot-circle"></i>Cancellazione prodotto
                  </span>
                </li>
                <li
                  onClick={() => this.selectTab("2")}
                  className={`${this.state.tabFilter === "2" ? "active" : ""}`}
                >
                  <span>
                    <i className="fas fa-dot-circle"></i>Informazione
                  </span>
                </li>
                <li
                  onClick={() => this.selectTab("1")}
                  className={`${this.state.tabFilter === "1" ? "active" : ""}`}
                >
                  <span>
                    <i className="fas fa-dot-circle"></i>Nuovo prodotto
                  </span>
                </li>
                {role && role === "super_admin" && (
                  <li>
                    <button onClick={this.showModal}>Crea Annuncio</button>
                  </li>
                )}
              </ul>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                {ads_loading ? (
                  <Loader />
                ) : adsFiltered.length === 0 ? (
                  <div>Nessuna annunci per questa scheda</div>
                ) : null}
                {adsFiltered.map((m) => (
                  <div key={m.id}>
                    <div
                      onClick={() => this.tabExpand(m.id)}
                      className="panel-tab"
                      aria-expanded={
                        this.state.expanded.find((tab) => tab === m.id) !== null
                          ? true
                          : false
                      }
                    >
                      <i
                        id={
                          m.importance === "1"
                            ? "new"
                            : m.importance === "2"
                            ? "info"
                            : m.importance === "3"
                            ? "canceled"
                            : m.importance === "4"
                            ? "private"
                            : ""
                        }
                        className="fas fa-dot-circle"
                      ></i>
                      <h4>{m.title}</h4>
                      <span className="date-pane">
                        {moment(m.updated_at).format("DD/MM/YYYY HH:mm")}
                      </span>
                      <img
                        src={images.uparrow}
                        alt=""
                        style={{
                          transform:
                            this.state.expanded.find((tab) => tab === m.id) !=
                            null
                              ? "rotate(0)"
                              : "rotate(180deg)",
                        }}
                      />
                    </div>
                    <div
                      className={`nav nav-tabs panel-content panel-content-annunci collapse ${
                        this.state.expanded.find((tab) => tab === m.id) != null
                          ? "show"
                          : ""
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <Modal
                tittle="Crea un annunci"
                show={this.state.modal}
                hide={this.hideModal}
              >
                <AddAdsForm
                  adsCreationgLoading={this.props.adsCreationgLoading}
                  adsCreationgMess={this.props.adsCreationgMess}
                  getAds={this.props.getAds}
                  createAds={this.props.createAds}
                  hideModal={this.hideModal}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AddAds extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createAds(values);
        setTimeout(() => {
          if (this.props.adsCreationgMess.errors) {
            this.props.form.resetFields();
          } else {
            this.props.getAds();
            this.props.hideModal();
          }
        }, 3000);
      }
    });
  };

  render() {
    let { adsCreationgLoading, adsCreationgMess } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Anunnci tipo">
            {getFieldDecorator("importance", {
              rules: [
                {
                  required: true,
                  message: "Please select ads type",
                },
              ],
            })(
              <Radio.Group>
                <Radio value={3}>Cancellazione prodotto</Radio>
                <Radio value={2}>Informazione</Radio>
                <Radio value={1}>Nuovo Prodotto</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="Title">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Please input ad title",
                },
              ],
            })(<Input placeholder="Please input ad title" />)}
          </Form.Item>
          <Form.Item label="Text">
            {getFieldDecorator("text", {
              rules: [
                {
                  required: true,
                  message: "Please input ad text",
                },
              ],
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Form.Item>
            {adsCreationgLoading && <Loader />}
            {adsCreationgMess && adsCreationgMess.errors ? (
              <div className="alert alert-danger text-center" role="alert">
                {adsCreationgMess.message}
              </div>
            ) : adsCreationgMess && adsCreationgMess.message ? (
              <div className="alert alert-success text-center" role="alert">
                {adsCreationgMess.message}
              </div>
            ) : null}
            <Button
              disabled={adsCreationgLoading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const AddAdsForm = Form.create({ name: "addAnnunci" })(AddAds);

const mapStateToProps = (state) => ({
  ads: state.auth.ads,
  ads_loading: state.auth.ads_loading,
  accountInfo: state.auth.accountInfo,
  adsCreationgLoading: state.auth.adsCreationgLoading,
  adsCreationgMess: state.auth.adsCreationgMess,
});

export default connect(mapStateToProps, { ...MainActions, ...AuthActions })(
  Annunci
);
