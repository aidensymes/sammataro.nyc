// On content loaded
////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  setTextSize();

  initPop();
  initScramble();
  initWrite();
  initButtons();
});

window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("hide");
  triggerAllAnimations();
});

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  setTextSize();
});

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

function handleScroll() {
  var scrollTop = this.scrollTop;
  triggerAllAnimations();
  lastScrollTop = scrollTop;
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

window.onscroll = () => {
  debounce(handleScroll, 10);
};

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

// Image pop animation
////////////////////////////////////////////////////////////////////////////////
var popElements; // Get animation elements

function setupPop(element, reset) {
  const left = element.getBoundingClientRect().left,
    percentage = left / windowWidth;
  element.style.transform = `translateY(${20 + percentage * 120}px)`;
}

function pop(element) {
  element.style.transform = "translateY(0px)";
}

function initPop() {
  popElements = Array.from(document.getElementsByClassName("pop"));
  for (const element of popElements) {
    element.classList.add("no-transition");
    setupPop(element);
    setTimeout(() => {
      element.classList.remove("no-transition");
    }, 0);
  }
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
var scrambleElements; // Get animation elements

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

function initScramble() {
  scrambleElements = Array.from(document.getElementsByClassName("scramble"));
  for (const line of scrambleElements) {
    line.classList.add("no-transition");
    setupScramble(line);
    line.classList.remove("no-transition");
  }
}

// Write animations
////////////////////////////////////////////////////////////////////////////////
var writeElements;

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

function initWrite() {
  writeElements = Array.from(document.getElementsByClassName("write"));
  for (const text of writeElements) {
    text.classList.add("no-transition");
    setupWrite(text);
    text.classList.remove("no-transition");
  }
}

// Header nav
////////////////////////////////////////////////////////////////////////////////
// function toggleHeader(scrollTop) {
//   if ($(".fullscreen-nav").is(":visible")) {
//     $("header").addClass("down");
//   } else if (scrollTop == 0) {
//     $("header").removeClass("down");
//   } else if (scrollTop < lastScrollTop) {
//     $("header").addClass("down");
//   } else {
//     $("header").removeClass("down");
//   }
// }
