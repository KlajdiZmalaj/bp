import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

import { Form, DatePicker, Modal } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { Azioni } from "../../shared-components";
import { slicedAmount } from "utils";

class Transazioni extends React.Component {
  state = {
    selectedFilter: 3,
    visible: false,
    indexT: null
  };
  showModal = index => {
    this.setState({
      visible: true
    });
    this.setState({
      indexT: index
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.getPayments("", values.from, values.to);
      }
    });
  };

  changeSelected = filter => {
    this.setState({ selectedFilter: filter });
    if (filter === 0) {
      this.props.getPayments("", moment(), moment());
    }
    if (filter === 1) {
      this.props.getPayments("", moment().subtract(1, "days"), moment());
    }
    if (filter === 2) {
      const time7daysAgo = moment()
        .subtract(7, "days")
        .startOf("day");
      this.props.getPayments("", time7daysAgo, moment());
    }
    if (filter === 3) {
      const time30daysAgo = moment()
        .subtract(30, "days")
        .startOf("day");
      this.props.getPayments("", time30daysAgo, moment());
    }
  };
  componentDidMount() {
    this.props.getPayments();
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const { payments } = this.props;
    const { selectedFilter, indexT } = this.state;
    const filters = ["oggi", "ieri", "questa sett.", "questo messe"];

    return (
      <div>
        <div className="container-fluid overview ">
          <Azioni active="transazioni"></Azioni>

          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni max-width border-0">
              <h1 className="heading-tab ">Transazioni</h1>
              <div className="datepics ml-auto mr-2">
                <Form
                  {...formItemLayout}
                  onSubmit={this.handleSubmit}
                  className="filters"
                >
                  <div className="dal">
                    {
                      <Form.Item>
                        {getFieldDecorator(
                          "from",
                          {}
                        )(
                          <DatePicker
                            format={("DD/MM/YYYY", "DD/MM/YYYY")}
                            placeholder="Dal"
                          />
                        )}
                      </Form.Item>
                    }
                  </div>
                  <div className="al">
                    {
                      <Form.Item>
                        {getFieldDecorator("to", {
                          rules: [{ type: "object" }]
                        })(
                          <DatePicker
                            format={("DD/MM/YYYY", "DD/MM/YYYY")}
                            placeholder="Al"
                          />
                        )}
                      </Form.Item>
                    }
                  </div>

                  <div>
                    <button className="filterBtn" htmltype="submit">
                      Filter
                    </button>
                  </div>
                </Form>

                <div className="codice"></div>
              </div>
              <ul className="m-0 p-0">
                {filters.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={index === selectedFilter && "active"}
                      onClick={() => this.changeSelected(index)}
                    >
                      <i className="fas fa-dot-circle"></i>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                <table className="transTable">
                  <thead>
                    <tr>
                      <td>Date / Ora</td>
                      <td>Barcode</td>
                      <td>Service</td>
                      <td>Importo</td>
                      <td>Commissione</td>
                      <td>Proviggione</td>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((item, index) => {
                      return (
                        <tr key={index} onClick={() => this.showModal(index)}>
                          <td>
                            {moment(item.executed_date).format(
                              "DD/MM/YYYY  HH:MM:ss"
                            )}
                          </td>
                          <td>{item.barcode}</td>
                          <td>{item.service_name}</td>
                          <td>
                            {item.price1000
                              ? slicedAmount(item.price1000 / 1000)
                              : "-"}
                          </td>
                          <td>{item.commissione ? item.commissione : "-"} </td>
                          <td>{item.percentage > 0 ? item.percentage : "-"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
            title={null}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            {indexT !== null && payments[indexT] && (
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: payments[indexT].receipt
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/\t/g, "\u00a0")
                      .replace(/\n/g, "<br/>")
                  }}
                />
              </div>
            )}
          </Modal>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>
      </div>
    );
  }
}

const TransazioniF = Form.create({ name: "Transazioni" })(Transazioni);

const mapsStateToProps = state => ({
  isShowing: state.main.isShowing,
  service_id: state.auth.service_id,
  payments: state.auth.payments
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  TransazioniF
);
