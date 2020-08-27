import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
const VoliUserForm = ({
  handleChangeName,
  handleChangeCognome,
  handleChangeDate,
  handleChangeTel,
  handleChangeEmail,
  isChild,
  isAdult,
  ind,
}) => {
  return (
    <div className={isChild ? "child" : isAdult ? "adult" : ""}>
      <div className="header">
        {isAdult ? `Adulto ${ind + 1}` : isChild ? `Bambino ${ind + 1}` : ""}
      </div>
      <div className={"formsContainer--body__item"}>
        <div className="label"> Name</div>
        <input
          type="text"
          onChange={(e) => {
            isAdult
              ? handleChangeName(
                  {
                    [`adult${ind + 1}`]: {
                      name: e.target.value,
                    },
                  },
                  `adult${ind + 1}`
                )
              : handleChangeName(
                  {
                    [`child${ind + 1}`]: {
                      name: e.target.value,
                    },
                  },
                  `child${ind + 1}`
                );
          }}
        />
      </div>
      <div className="formsContainer--body__item">
        <div className="label"> Cognome</div>
        <input
          type="text"
          onChange={(e) => {
            isAdult
              ? handleChangeCognome(
                  {
                    [`adult${ind + 1}`]: {
                      cogname: e.target.value,
                    },
                  },
                  `adult${ind + 1}`
                )
              : handleChangeCognome(
                  {
                    [`child${ind + 1}`]: {
                      cogname: e.target.value,
                    },
                  },
                  `child${ind + 1}`
                );
          }}
        />
      </div>
      <div className="formsContainer--body__item">
        <div className="label"> Data Di Nascita</div>

        <DatePicker
          onChange={(e) => {
            isAdult
              ? handleChangeDate(
                  {
                    [`adult${ind + 1}`]: {
                      date: moment(e).format("DD/MM/YYYY"),
                    },
                  },
                  `adult${ind + 1}`
                )
              : handleChangeDate(
                  {
                    [`child${ind + 1}`]: {
                      date: moment(e).format("DD/MM/YYYY"),
                    },
                  },
                  `child${ind + 1}`
                );
          }}
          format={("DD/MM/YYYY", "DD/MM/YYYY")}
        />
      </div>
      {ind === 0 && isAdult && (
        <div className="formsContainer--body__item">
          <div className="label">Telefono</div>
          <input
            type="text"
            onChange={(e) =>
              handleChangeTel(
                {
                  [`adult${ind + 1}`]: {
                    tel: e.target.value,
                  },
                },
                `adult${ind + 1}`
              )
            }
          />
        </div>
      )}
      {ind === 0 && isAdult && (
        <div className="formsContainer--body__item">
          <div className="label"> E-mail</div>
          <input
            type="text"
            onChange={(e) =>
              handleChangeEmail(
                {
                  [`adult${ind + 1}`]: {
                    email: e.target.value,
                  },
                },
                `adult${ind + 1}`
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default VoliUserForm;
