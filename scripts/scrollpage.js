"use strict";

window.addEventListener("DOMContentLoaded", animateText);

////////////////////   Animate text like Peter's coolText animation ///////////////
function animateText() {
  const coolText = document.querySelector("#cooltext");
  let letterByLetter = Array.from(coolText.textContent);
  console.log(letterByLetter);
  coolText.innerHTML = "";
  letterByLetter.forEach((letter, index) => {
    const animateLetter = document.createElement("span");
    animateLetter.classList.add("letter", "fade-in-bottom");
    animateLetter.style.setProperty("--letter", index);
    if (letter === " ") {
      animateLetter.innerHTML = "&nbsp;";
    } else {
      animateLetter.textContent = letter;
    }
    coolText.append(animateLetter);
  });
}

////////////// Text easing in from bottom /////////////
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll("[data-scrollTrigger]").forEach((el) => {
  console.log(el, el.dataset.duration);
  gsap.from(el, {
    y: 100,
    duration: parseInt(el.dataset.duration) || 2,
    scrollTrigger: el,
  });
});

/* /////////// Additional features horizontal scroll/swipe /////////
const cards = document.querySelectorAll(".card");

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isCardVisible() {
  cards.forEach((card) => {
    isElementInViewport(card)
      /* ? card.classList.add("isVisible")
      : card.classList.remove("isVisible");
  });
}

document.addEventListener("DOMContentLoaded", isCardVisible);
window.addEventListener("scroll", isCardVisible);
window.addEventListener("resize", isCardVisible); */

/////////// Parallax /////////
/* gsap.to(".slower", {
  y: -100,
  ease: "none",
  scrollTrigger: {
    markers: true,
    trigger: "#section_2",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true,
  },
});
gsap.to(".faster", {
  y: 500,
  ease: "none",
  scrollTrigger: {
    markers: true,
    trigger: "#section_2",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true,
  },
}); */
