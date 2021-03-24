"use strict";

const keyboardContainer = document.querySelector(".keyboard");
let options = [];

let selectedOption = null;
let SVG = null;

const features = {
  case: {
    metalCase: false,
    plasticCase: true,
  },
  cable: {
    coiledCable: true,
    straightCable: false,
    wireless: false,
  },
  wristRest: {
    wristRest: false,
  },
};

const colors = {
  plasticCase: ["blue", "red", "green"],
  keycaps: ["green", "limegreen", "skyblue"],
  coiledCable: ["blue", "red", "green"],
  metalCase: ["yellow", "red", "green"],
  wristRest: ["blue", "red", "green"],
};

async function init() {
  const res = await fetch("./images/KeyboardMod.svg");
  const svgText = await res.text();
  keyboardContainer.innerHTML += svgText;

  const svg = document.querySelector("#keyboard");
  SVG = svg;

  const groups = svg.querySelectorAll("g:not(.shadow)");

  groups.forEach((g) => {
    g.addEventListener("click", () => {
      g.style.color = "red";
    });
  });

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

  updateSVGState();
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
    if (featureKey !== "wristRest") features[category][featureKey] = false;
  });

  features[category][feature] = !features[category][feature];
  console.log(feature);
  showColors(feature);
  updateSVGState();
}

function updateSVGState() {
  const allCategoryKeys = Object.keys(features);

  allCategoryKeys.forEach((categoryKey) => {
    const allFeatureKeys = Object.keys(features[categoryKey]);
    allFeatureKeys.forEach((featureKey) => {
      const svgElement = SVG.querySelector(`#${featureKey}`);
      if (svgElement) {
        if (features[categoryKey][featureKey]) {
          svgElement.style.display = "block";
        } else {
          svgElement.style.display = "none";
        }
      }
    });
  });
}

function showColors(feature) {
  const colorPicker = document.querySelector(".color-picker");
  console.log(feature);
  colorPicker.innerHTML = "";

  if (!colors[feature]) return;

  colors[feature].forEach((colorCode) => {
    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.style.setProperty("--color", colorCode);
    colorPicker.appendChild(colorElement);
  });

  colorPicker.querySelectorAll(".color").forEach((color) => {
    color.addEventListener("click", () => {
      colorPicker.querySelectorAll(".color").forEach((color) => {
        color.classList.remove("active");
      });
      color.classList.add("active");
    });
  });
}

init();
