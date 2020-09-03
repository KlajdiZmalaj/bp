import React from "react";
import moment from "moment";
import { DatePicker as AntdDatePicker, ConfigProvider } from "antd";
import locale from "antd/es/locale/it_IT";
const DatePicker = ({
  disabled,
  placeholder,
  defaultValue,
  showTime,
  format,
  onChange,
  value,
}) => {
  const params = {
    ...(placeholder ? { placeholder } : {}),
    ...(defaultValue ? { defaultValue } : {}),
    ...(showTime ? { showTime } : {}),
    ...(value ? { value } : {}),
  };
  return (
    <React.Fragment>
      <ConfigProvider locale={locale}>
        <AntdDatePicker
          disabled={disabled ? disabled : false}
          locale={locale}
          format={format ? format : "YYYY--MM--DD"}
          onChange={(e) => {
            onChange(e);
          }}
          {...params}
        />
      </ConfigProvider>
    </React.Fragment>
  );
};
export default DatePicker;
