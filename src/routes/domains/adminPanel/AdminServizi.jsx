import React from "react";
import "./styles.css";
import AdminServiziItem from "./AdminServiziItem";
class AdminServizi extends React.Component {
  render() {
    const list = [
      { name: "expedia" },
      { name: "ryanair" },
      { name: "ryanair" },
      { name: "trivago" },
      { name: "expedia" },
      { name: "ryanair" },
      { name: "ryanair" },
      { name: "trivago" },
      { name: "expedia" },
      { name: "ryanair" },
      { name: "ryanair" },
      { name: "trivago" },
    ];

    return (
      <div className="AdminServizi">
        {list.map((itemList) => (
          <AdminServiziItem {...itemList} />
        ))}
      </div>
    );
  }
}
export default AdminServizi;
