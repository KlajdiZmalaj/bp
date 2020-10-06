import React from "react";
import { Form, Input } from "antd";
import { get } from "lodash";

const ReturnFormItem = ({
  name,
  message,
  barcodeData,
  descName,
  getFieldDecorator,
  icon,
  NotInput,
  placeholder,
  defaultValue,
}) => (
  <div className="InputItem">
    <span>
      {descName} <span className="Red">*</span>
    </span>
    <Form.Item>
      {getFieldDecorator(`${name}`, {
        rules: [
          {
            required: message ? true : false,
            message: message ? `${message}` : "",
            whitespace: true,
          },
        ],
        initialValue: defaultValue
          ? defaultValue
          : get(barcodeData, `data.${name}` || ""),
      })(
        NotInput ? (
          NotInput
        ) : (
          <Input placeholder={placeholder ? placeholder : name} />
        )
      )}
    </Form.Item>
    {icon && icon}
  </div>
);
export default ReturnFormItem;
