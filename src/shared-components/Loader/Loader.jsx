import React from "react";
import "./style.css";

const Loader = () => (
  <div className="loader">
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="60"
      height="60"
      viewBox="0 0 24 30"
    >
      <rect x="0" y="0" width="2" height="20">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="7" y="0" width="2" height="20">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="14" y="0" width="2" height="20">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
);
export default Loader;
