import React, { Component } from "react";
import "./snow.css";
import { isWinter } from "config";
const Snowf = ({ max }) => {
  let snowflakes = [];
  let size = [10, 15, 20];
  let opacity = [0.5, 0.8, 1];
  let delay = [0, 0, 0, 0, 1, 2];
  let speed = [
    "3s",
    "4s",
    "6s",
    "7s",
    "8s",
    "9s",
    "10s",
    "11s",
    "12s",
    "13s",
    "14s",
  ];
  let animatios = [
    "snowamin",
    "snowamin2",
    "snowamin3",
    "snowamin4",
    "snowamin5",
  ];
  for (var i = 0; i < max; i++) {
    const randAnim = animatios[Math.floor(Math.random() * animatios.length)];
    const randSize = size[Math.floor(Math.random() * size.length)];
    const randOpacity = opacity[Math.floor(Math.random() * opacity.length)];
    const randSpeed = speed[Math.floor(Math.random() * speed.length)];
    const randDelay = delay[Math.floor(Math.random() * delay.length)];

    snowflakes.push(
      <span
        className={randAnim}
        key={i}
        style={{
          opacity: randOpacity,
          fontSize: randSize,
          animationDuration: randSpeed,
          animationDelay: randDelay + "s",
        }}
      >
        •
      </span>
    );
  }
  return snowflakes;
};
class Snow extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      isWinter && (
        <div className="snowContainer">
          <Snowf max={30} />
        </div>
      )
    );
  }
}

export default Snow;
