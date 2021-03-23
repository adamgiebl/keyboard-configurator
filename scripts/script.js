"use strict";

const keyboardContainer = document.querySelector(".keyboard");
let options = [];

let selectedOption = null;
let SVG = null;

const features = {
  case: {
    metalCase: false,
    plasticCase: false,
  },
  cable: {
    coiledCable: false,
    straightCable: false,
  },
  wristRest: {
    wristRest: false,
  },
};

const colors = {
  plasticCase: ["blue", "red", "green"],
  keycaps: ["green", "limegreen", "skyblue"],
  coiledCable: ["blue", "red", "green"],
  metalCase: ["blue", "red", "green"],
  wristRest: ["blue", "red", "green"],
};

async function init() {
  const res = await fetch("./images/KeyboardMod.svg");
  const svgText = await res.text();
  keyboardContainer.innerHTML += svgText;

  const svg = document.querySelector("#keyboard");
  SVG = svg;

  hideMetalCase(svg);
  hideCable(svg);

  const groups = svg.querySelectorAll("g:not(.shadow)");

  groups.forEach((g) => {
    g.addEventListener("click", () => {
      g.style.color = "red";
    });
  });

  const colorPicker = document.querySelector(".color-picker");

  const optionItems = document.querySelectorAll(".option-item");
  optionItems.forEach((item) => {
    const category = item.dataset.category;
    const feature = item.dataset.feature;
    item.addEventListener("click", () => {
      updateItemState(category, feature);

      if (features[category][feature]) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }

      console.log(features);
    });
  });
}

function updateItemState(category, feature) {
  const optionItems = document.querySelectorAll(".option-item");
  optionItems.forEach((item) => {
    if (item.dataset.category === category) {
      item.classList.remove("active");
    }
  });
  const featuresInCategory = Object.keys(features[category]);
  featuresInCategory.forEach((featureKey) => {
    features[category][featureKey] = false;
  });

  features[category][feature] = !features[category][feature];

  updateSVGState();
}

function updateSVGState() {
  const allCategoryKeys = Object.keys(features);

  allCategoryKeys.forEach((categoryKey) => {
    const allFeatureKeys = Object.keys(features[categoryKey]);
    allFeatureKeys.forEach((featureKey) => {
      if (features[categoryKey][featureKey]) {
        SVG.querySelector(`#${featureKey}`).style.display = "block";
      } else {
        SVG.querySelector(`#${featureKey}`).style.display = "none";
      }
    });
  });
}

function hideMetalCase(svg) {
  svg.querySelector("#metalCase").style.display = "none";
}

function hideCable(svg) {
  svg.querySelector("#straightCable").style.display = "none";
}

init();
