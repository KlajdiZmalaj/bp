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
}) => {
  const spreadProp = [];
  if (valuePropName) {
    spreadProp.valuePropName = valuePropName;
  }
  return (
    <div className="InputItem">
      {descName && (
        <span>
          {descName} <span className="Red">*</span>
        </span>
      )}
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
      {icon && icon}
    </div>
  );
};
export default ReturnFormItem;
