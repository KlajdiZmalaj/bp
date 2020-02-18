import React, { Component } from "react";
import { Form, Button, Input } from "antd";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log("error ", err);
      }
      if (!err) {
        console.log("vals ", values);
        this.props.getChangedPassword(values.oldPassword, values.newPassword);
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    // console.log("ca ka val next", value, rule);
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    // console.log("ca ka compare", value, form.getFieldValue("newPassword"));
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Passowrds different");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { passwordToReset } = this.state;
    return (
      <div className="changePassword">
        <h2>Cambio password</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Password attuale" hasFeedback>
            {getFieldDecorator("oldPassword", {
              rules: [
                {
                  required: true,
                  message: "Write old password"
                }
              ]
            })(<Input.Password />)}
          </Form.Item>

          <Form.Item label="Nuova password" hasFeedback>
            {getFieldDecorator("newPassword", {
              rules: [
                {
                  required: true,
                  message: "Write new password"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Conferma password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Renter new password"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Button type="primary" htmltype="submit" onClick={this.handleSubmit}>
            Cambia
          </Button>
        </Form>
      </div>
    );
  }
}
const Profilee = Form.create({ name: "changePassword" })(Profile);

const mapsStateToProps = state => ({});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  Profilee
);
