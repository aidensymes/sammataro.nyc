// On content loaded
////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  setTextSize();

  initializeAnimation("pop", popElements, setupPop);
  initializeAnimation("write", writeElements, setupWrite);
  initializeAnimation("scramble", scrambleElements, setupScramble);

  initButtons();
  initNav();
  initAnnouncement();
});

window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("hide");
  triggerAllAnimations();
});

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  setTextSize();
  resizeAnnouncement();
});

// Announcement nav
////////////////////////////////////////////////////////////////////////////////
// From: https://stackoverflow.com/questions/51505446/css-scrolling-text-loop
var outer, content, loop, text;

function initAnnouncement() {
  outer = document.querySelector("#announcement__outer");
  if (outer) {
    content = outer.querySelector("#announcement__content");
    loop = outer.querySelector("#announcement__loop");
    text = content.innerHTML;
    repeatContent(content, outer.offsetWidth);
  }
}

function repeatContent(el, outerWidth) {
  const html = el.innerHTML;
  const counter = Math.ceil(outerWidth / el.offsetWidth + 3); // Add a few extra to be safe

  loop.style.animationDuration = `${counter * 15}s`;

  for (let i = 0; i <= counter; i++) {
    el.innerHTML += html;
  }
}

function resizeAnnouncement() {
  if (content) {
    content.innerHTML = text;
    repeatContent(content, outer.offsetWidth);
  }
}

// Scroll to function
////////////////////////////////////////////////////////////////////////////////
function scrollToElement(id) {
  const element = document.getElementById(id);
  const distance = element.getBoundingClientRect().top;
  if (!distance) {
    return;
  }
  const position = window.scrollY + distance - 40;
  window.scrollTo({
    top: position,
    left: 0,
    behavior: "smooth",
  });
}

// On scroll
////////////////////////////////////////////////////////////////////////////////
var lastScrollTop = 0;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function debounce(method, delay) {
  clearTimeout(method._tId);
  method._tId = setTimeout(function () {
    method();
  }, delay);
}

function triggerAllAnimations() {
  if (scrambleElements.length > 0) {
    triggerAnimation(scrambleElements, scramble, setupScramble);
  }
  if (writeElements.length > 0) {
    triggerAnimation(writeElements, write, setupWrite);
  }
  if (popElements.length > 0) {
    triggerAnimation(popElements, pop, setupPop, 500);
  }
}
var lastScrollTop;

function handleScroll() {
  triggerAllAnimations();
  var scrollTop = window.scrollY;
  toggleNav(scrollTop);
  lastScrollTop = scrollTop;
}

window.onscroll = () => {
  debounce(handleScroll, 10);
};

// Header nav
////////////////////////////////////////////////////////////////////////////////
var nav;
var preventNavhide = false;

function initNav() {
  nav = document.getElementById("nav");
  toggleNav();
}

function toggleNav(scrollTop) {
  if (nav) {
    if (scrollTop == 0) {
      nav.classList.remove("down");
    } else if (scrollTop < lastScrollTop) {
      nav.classList.add("down");
      preventNavhide = true;
      setTimeout(() => {
        preventNavhide = false;
      }, 500);
    } else if (preventNavhide === false) {
      nav.classList.remove("down");
    }
  }
}

// Resize h1 & h2
////////////////////////////////////////////////////////////////////////////////
function setTextSize() {
  const elements = document.getElementsByClassName("resize");
  const wrapper = document.getElementsByClassName("wrapper")[0];
  if (wrapper) {
    for (const element of elements) {
      if (element) {
        if (element.tagName === "H1") {
          const fontSize = wrapper.offsetWidth / 9.1;
          element.style.fontSize = `${fontSize >= 45 ? fontSize : 45}px`;
        } else if (element.tagName === "H2") {
          const fontSize = wrapper.offsetWidth / 40;
          element.style.fontSize = `${fontSize >= 20 ? fontSize : 20}px`;
        }
      }
    }
  }
}

// Button Strike through effect
////////////////////////////////////////////////////////////////////////////////
function initButtons() {
  const buttons = document.getElementsByClassName("button");

  const strikesLight = [
    "/assets/graphics/sammataro_strike-1-light.svg",
    "/assets/graphics/sammataro_strike-2-light.svg",
    "/assets/graphics/sammataro_strike-3-light.svg",
  ];

  const strikesDark = [
    "/assets/graphics/sammataro_strike-1.svg",
    "/assets/graphics/sammataro_strike-2.svg",
    "/assets/graphics/sammataro_strike-3.svg",
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  for (const button of buttons) {
    button.addEventListener("mouseenter", () => {
      var strikeURL = [];
      if (button.classList.contains("dark")) {
        strikeURL = strikesLight.slice();
      } else {
        strikeURL = strikesDark.slice();
      }
      const strike = button.querySelector(".button__strike");
      if (strike) {
        strike.src = strikeURL[getRandomInt(strikeURL.length)];
        strike.style.transform = `translate(-50%, -50%) rotate(${
          Math.random() * 20 + 10
        }deg)`;
      }
    });
  }
}

// Animation Utilties
////////////////////////////////////////////////////////////////////////////////
var popElements = []; // Get animation elements
var scrambleElements = [];
var writeElements = [];

function checkView(element) {
  const elementTop = element?.getBoundingClientRect().top;

  if (elementTop < windowHeight) {
    return true;
  }
  return false;
}

function checkForReset(element) {
  const elementTop = element?.getBoundingClientRect().top;
  if (elementTop > windowHeight) {
    return true;
  }
  return false;
}

function triggerAnimation(elements, animation, reset, delay) {
  for (const element of elements) {
    if (!element.classList.contains("no-transition") && checkView(element)) {
      animation(element);
      if (delay) {
        setTimeout(() => {
          element.classList.add("no-transition");
        }, delay);
      } else {
        element.classList.add("no-transition");
      }
    } else if (
      element.classList.contains("no-transition") &&
      checkForReset(element)
    ) {
      reset(element, true);
      element.classList.remove("no-transition");
    }
  }
}

function animationPromise(element, animation, className) {
  return new Promise(function (resolve, reject) {
    element.classList.add(className);
    animation(element);
    if (element.classList.contains(className)) {
      resolve("Passed");
    } else {
      reject("Error in update class list");
    }
  });
}

function initializeAnimation(className, array, setup) {
  const elements = Array.from(document.getElementsByClassName(className));
  for (const element of elements) {
    array.push(element);
    animationPromise(element, setup, "no-transition").then(function () {
      element.classList.remove("no-transition");
    });
  }
}

// Image pop animation
////////////////////////////////////////////////////////////////////////////////
function setupPop(element, reset) {
  const left = element.getBoundingClientRect().left,
    percentage = left / windowWidth;
  element.style.transform = `translateY(${20 + percentage * 120}px)`;
}

function pop(element) {
  element.style.transform = "translateY(0px)";
}

//  Text Utilities
////////////////////////////////////////////////////////////////////////////////
function splitWordIntoLetters(word) {
  word.innerHTML = word.innerText.replace(/./g, "<span>$&</span>");
}

function splitLineIntoWords(line) {
  line.innerHTML = line.innerText.replace(/\w+/g, "<span>$& </span>");
}

function splitTextIntoLines(text) {
  text.innerHTML = text.innerText.replace(/.+$/gm, "<div>$& </div>");
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Scramble animations
////////////////////////////////////////////////////////////////////////////////
function setupScramble(line, reset) {
  if (!reset) {
    splitLineIntoWords(line);
  }
  for (let i = 0; i < line.children.length; i++) {
    const word = line.children.item(i);
    if (word) {
      word.style.transform = `rotate(${getRandom(3, -3)}deg`;
      if (!reset) {
        splitWordIntoLetters(word);
      }
      for (let i = 0; i < word.children.length; i++) {
        const letter = word.children.item(i);
        if (letter) {
          letter.style.transform = `translateX(${getRandom(
            10,
            -10
          )}px) translateY(${getRandom(50, 300)}px) rotate(${getRandom(
            40,
            -40
          )}deg`;
        }
      }
    }
  }
}

function scramble(element) {
  for (let i = 0; i < element.children.length; i++) {
    const word = element.children.item(i);
    if (word) {
      for (let i = 0; i < word.children.length; i++) {
        const letter = word.children.item(i);
        if (letter) {
          letter.style.transform = `rotate(${getRandom(4, -4)}deg`;
        }
      }
    }
  }
}

// Write animations
////////////////////////////////////////////////////////////////////////////////
function setupWrite(text, reset) {
  if (!reset) {
    splitTextIntoLines(text);
  }
  for (let i = 0; i < text.children.length; i++) {
    const line = text.children.item(i);
    if (line) {
      if (!reset) {
        splitWordIntoLetters(line);
      }
      for (let i = 0; i < line.children.length; i++) {
        const letter = line.children.item(i);
        if (letter) {
          letter.classList.add("hidden");
        }
      }
    }
  }
}

function write(element) {
  for (let i = 0; i < element.children.length; i++) {
    const line = element.children.item(i);
    if (line) {
      for (let i = 0; i < line.children.length; i++) {
        const letter = line.children.item(i);
        if (letter) {
          setTimeout(() => {
            letter.classList.remove("hidden");
          }, i * 40 + 100);
        }
      }
    }
  }
}
