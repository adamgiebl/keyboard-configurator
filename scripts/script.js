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
  keyboardContainer.innerHTML = svgText;

  const svg = document.querySelector("#keyboard");

  hideMetalCase(svg);

  const groups = svg.querySelectorAll("g:not(.shadow)");

  groups.forEach((g) => {
    g.addEventListener("click", () => {
      g.style.color = "red";
    });
  });
}

init();

function hideMetalCase(svg) {
  svg.querySelector("#orangecase-shadow").style.display = "none";

  svg.querySelector("#orange-case").style.display = "none";
}
