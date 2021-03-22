"use strict";

const keyboardContainer = document.querySelector(".keyboard");
let options = [];
const features = {
  orangeCase: false,
  blueCase: false,
  coiledCable: false,
  straightCable: false,
  wristRest: false,
};

async function init() {
  const res = await fetch("./images/Keyboard.svg");
  const svgText = await res.text();
  headContainer.innerHTML = svgText;
}
