import React from "react";
import { notification } from "antd";
import images from "themes/images";
const AdminServiziItem = ({
  category_full_name,
  full_name,
  category,
  UpdateServicesChangeStatus,
  number_id,
  activeSkinId,
  getService,
  name,
  active,
}) => (
  <div className="AdminServiziItem">
    <div className="AdminServiziItem--Header">
      <div className="AdminServiziItem--Header--Prenotazione">
        {category_full_name.toUpperCase()}
      </div>
      <div className="AdminServiziItem--Header--Title">{full_name}</div>
    </div>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}

    <img
      src={`http://www.perdemo.it/ricaricheSPS/${category}.png`}
      className="AdminServiziItem--Image"
      onError={(e) => {
        //console.log("ca ka error", e, images.placeholder);
        e.target.src = images["placeholder"];
      }}
      alt=""
    />
    <div className="AdminServiziItem--ButtonWrapper">
      <div>
        <button
          onClick={() => {
            if (active === 0) {
              UpdateServicesChangeStatus(
                name,
                full_name,
                number_id,
                true,
                activeSkinId,
                async () => {
                  await notification["success"]({
                    message: "Lo stato viene modificato con successo",
                    description: "il servizio è attivato",
                  });
                  await getService();
                }
              );
            } else {
              notification["success"]({
                message: "Lo stato e gia attivato",
              });
            }
          }}
          className={`${active === 1 ? "active" : ""}`}
        >
          ACTIVE
        </button>
        <button
          onClick={() => {
            if (active === 1) {
              UpdateServicesChangeStatus(
                name,
                full_name,
                number_id,
                false,
                activeSkinId,
                async () => {
                  await notification["error"]({
                    message: "Lo stato viene modificato con successo",
                    description: "il servizio è disattivato",
                  });
                  await getService();
                }
              );
            } else {
              notification["error"]({
                message: "Lo stato e gia disattivato",
              });
            }
          }}
          className={`${active === 0 ? "active" : ""}`}
        >
          INACTIVE
        </button>
      </div>
      <div>
        <i className="fas fa-cog"></i>
      </div>
    </div>
  </div>
);
export default AdminServiziItem;
