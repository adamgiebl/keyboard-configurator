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
  const res = await fetch("./images/KeyboardMod.svg");
  const svgText = await res.text();
  keyboardContainer.innerHTML = svgText;

  const svg = document.querySelector("#keyboard");

  hideMetalCase(svg);
  hideCable(svg);

  const groups = svg.querySelectorAll("g:not(.shadow)");

  groups.forEach((g) => {
    //g.style.color = "white";
  });
  groups.forEach((g) => {
    g.addEventListener("click", () => {
      g.style.color = "red";
    });
  });
}

init();

function hideMetalCase(svg) {
  svg.querySelector("#orangecase").style.display = "none";
}

function hideCable(svg) {
  svg.querySelector("#straight-cable").style.display = "none";
}
