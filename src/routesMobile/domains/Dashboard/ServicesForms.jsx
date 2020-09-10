import React from "react";
import NumpadForm from "./modals/NumpadForm";

const ServicesForms = ({ activeService, activeCategory, setService }) => {
  return (
    <div className="servicesForms">
      {activeCategory === "RTELD" ||
      activeCategory === "RTELC" ||
      activeCategory === "RTELI" ? (
        <NumpadForm
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
        />
      ) : (
        <div>
          Service {activeService} comming soon!{" "}
          <button onClick={() => setService(null)}>Goback</button>
        </div>
      )}
    </div>
  );
};
export default ServicesForms;
