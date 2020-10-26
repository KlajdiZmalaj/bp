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
  valuePropName,
  datepicker,
  className,
}) => {
  const spreadProp = [];
  if (valuePropName) {
    spreadProp.valuePropName = valuePropName;
  }
  return (
    <div
      className={`InputItem ${
        className ? className : valuePropName ? "checkbox" : ""
      }`}
    >
      {descName && (
        <span className={`${valuePropName ? "checkbox" : "desc"}`}>
          {descName} <span className="Red">*</span>
        </span>
      )}
      <div className={`${valuePropName ? "checkbox" : "item"}`}>
        <Form.Item>
          {getFieldDecorator(`${name}`, {
            rules: datepicker
              ? [
                  {
                    type: "object",
                    required: true,
                    message: message ? `${message}` : "",
                  },
                ]
              : valuePropName
              ? []
              : [
                  {
                    required: message ? true : false,
                    message: message ? `${message}` : "",
                    whitespace: true,
                  },
                ],
            initialValue: defaultValue
              ? defaultValue
              : get(barcodeData, `data.${name}` || ""),
            ...spreadProp,
          })(
            NotInput ? (
              NotInput
            ) : (
              <Input placeholder={placeholder ? placeholder : descName} />
            )
          )}
        </Form.Item>
      </div>
      {icon && icon}
    </div>
  );
};
export default ReturnFormItem;
