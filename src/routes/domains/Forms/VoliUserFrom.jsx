import React from "react";

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
        {isAdult ? `Adult ${ind + 1}` : isChild ? `Child ${ind + 1}` : ""}
      </div>
      <div className={"formsContainer--body__item"}>
        <div className="label"> Name</div>
        <input
          type="text"
          onChange={(e) =>
            handleChangeName(
              {
                [`adult${ind + 1}`]: {
                  name: e.target.value,
                },
              },
              `adult${ind}`
            )
          }
        />
      </div>
      <div className="formsContainer--body__item">
        <div className="label"> Cognome</div>
        <input
          type="text"
          onChange={(e) =>
            handleChangeCognome(
              {
                [`adult${ind + 1}`]: {
                  cogname: e.target.value,
                },
              },
              `adult${ind}`
            )
          }
        />
      </div>
      <div className="formsContainer--body__item">
        <div className="label"> Data Di Nascita</div>
        <input
          type="text"
          onChange={(e) =>
            handleChangeDate(
              {
                [`adult${ind + 1}`]: {
                  date: e.target.value,
                },
              },
              `adult${ind}`
            )
          }
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
                `adult${ind}`
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
                `adult${ind}`
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default VoliUserForm;
