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
  keycapsMid: ["yellow", "red", "green"],
  keycapsRight: ["yellow", "red", "green"],
  keycapsLeft: ["yellow", "red", "green"],
};

async function init() {
  const res = await fetch("./images/mainSvg/KeyboardMod.svg");
  const svgText = await res.text();
  keyboardContainer.innerHTML += svgText;

  const svg = document.querySelector("#keyboard");
  SVG = svg;

  const groups = svg.querySelectorAll("g:not(.shadow, .keycaps)");

  groups.forEach((g) => {
    g.addEventListener("click", () => {
      const clickedFeature = g.id;
      console.log(clickedFeature);

      const optionItems = document.querySelectorAll(".option-item");
      optionItems.forEach((item) => {
        item.classList.remove("focused");
      });

      groups.forEach((g) => {
        g.classList.remove("focused");
      });

      g.classList.add("focused");

      const activeOptionItem = document.querySelector(
        `.option-item[data-feature=${clickedFeature}]`
      );

      if (activeOptionItem) {
        activeOptionItem.classList.add("focused");
      }

      selectedOption = clickedFeature;

      showColors(clickedFeature);
    });
  });

  const optionItems = document.querySelectorAll(".option-item");
  optionItems.forEach((item) => {
    const category = item.dataset.category;
    const feature = item.dataset.feature;
    item.addEventListener("click", () => {
      updateItemState(category, feature);
      selectedOption = feature;

      if (features[category][feature]) {
        item.classList.add("focused", "active");
      } else {
        item.classList.remove("active");
      }

      addToSelected();
    });
  });

  updateSVGState();
}

function addToSelected() {
  const selectedFeature = createFeatureElement(feature);
  document.querySelector(".selectedFeatures").appendChild(selectedFeature);

  const startPos = target.getBoundingClientRect();
  console.log(startPos);

  const endPos = selectedFeature.getBoundingClientRect();

  const difX =
    startPos.left - endPos.left + startPos.width / 2 - endPos.width / 2;
  const difY =
    startPos.top - endPos.top + startPos.height / 2 - endPos.height / 2;

  selectedFeature.style.transform = `translate(${difX}px, ${difY}px)`;

  requestAnimationFrame(() => {
    selectedFeature.style.transition = `all 0.5s linear`;
    selectedFeature.style.transform = `translate(0, 0)`;
  });
}

function createFeatureElement(feature) {
  const div = document.createElement("div");
  div.classList.add("selectedFeature");
  div.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `./${feature}.svg`;
  img.alt = feature;

  div.append(img);

  return div;
}

function updateItemState(category, feature) {
  const optionItems = document.querySelectorAll(".option-item");
  optionItems.forEach((item) => {
    item.classList.remove("focused");
    if (item.dataset.category === category) {
      item.classList.remove("active");
    }
  });
  const featuresInCategory = Object.keys(features[category]);
  featuresInCategory.forEach((featureKey) => {
    if (featureKey !== "wristRest") features[category][featureKey] = false;
  });

  features[category][feature] = !features[category][feature];

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
  runAnimationOnce(colorPicker, "jumpout");
  colorPicker.innerHTML = "";

  if (!colors[feature]) return;

  colors[feature].forEach((colorCode) => {
    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.style.setProperty("--color", colorCode);
    colorElement.dataset.value = colorCode;
    colorPicker.appendChild(colorElement);
  });

  colorPicker.querySelectorAll(".color").forEach((color) => {
    color.addEventListener("click", () => {
      colorPicker.querySelectorAll(".color").forEach((color) => {
        color.classList.remove("active");
      });
      color.classList.add("active");
      console.log("selectedOption", selectedOption);
      SVG.querySelector(`#${selectedOption}`).style.color = color.dataset.value;
    });
  });
}

function runAnimationOnce(element, className, callback = () => {}) {
  if (!element) return;
  element.classList.add(className);
  element.addEventListener("animationend", () => {
    element.classList.remove(className);
    callback();
  });
}

init();
