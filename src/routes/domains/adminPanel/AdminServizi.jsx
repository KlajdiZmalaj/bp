import React from "react";
import "./styles.css";
import AdminServiziItem from "./AdminServiziItem";
import { serviziList } from "./StaticAdminData";
class AdminServizi extends React.Component {
  render() {
    return (
      <div className="AdminServizi">
        {serviziList &&
          Array.isArray(serviziList) &&
          serviziList.map((itemList, i) => (
            <AdminServiziItem {...itemList} key={`${itemList.name}${i}`} />
          ))}
      </div>
    );
  }
}
export default AdminServizi;
