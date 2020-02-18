import React, { Component } from "react";
import { Form, Button, Input } from "antd";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      passwordToReset: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log("Received values of form: ", err);
      }
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    console.log("ca ka val next", value, rule);
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    console.log("ca ka compare", value, form.getFieldValue("newPassword"));
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Passowrds different");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { passwordToReset } = this.state;
    console.log("passwordToReset", passwordToReset);
    return (
      <div className="changePassword">
        <h2> Change Password</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Old password" hasFeedback>
            {getFieldDecorator("oldPassword", {
              rules: [
                {
                  required: true,
                  message: "Write old password"
                }
              ]
            })(<Input.Password />)}
          </Form.Item>

          <Form.Item label="New password" hasFeedback>
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
          <Form.Item label="Confirm new password" hasFeedback>
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
            Change PW
          </Button>
        </Form>
      </div>
    );
  }
}
const Profilee = Form.create({ name: "changePassword" })(Profile);
export default Profilee;
