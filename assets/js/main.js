// On content loaded
////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  setH1();
  initScramble();
  initWrite();
  initButtons();
  triggerAllAnimations();
});

window.addEventListener("resize", () => {
  setH1();
});

// On scroll
////////////////////////////////////////////////////////////////////////////////
var lastScrollTop = 0;

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
  if (scrambleElements.length > 0) triggerAnimation(scrambleElements, scramble);
  if (writeElements.length > 0) triggerAnimation(writeElements, write);
}

window.onscroll = () => {
  debounce(handleScroll, 10);
};

// Resize h1
////////////////////////////////////////////////////////////////////////////////
function setH1() {
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
  var elementTop = element?.getBoundingClientRect().top,
    windowHeight = window.innerHeight;

  if (elementTop < windowHeight) {
    return true;
  }
  return false;
}

function triggerAnimation(elements, animation) {
  for (let i = 0; i < elements.length; i++) {
    if (
      !elements[i].classList.contains("no-animation") &&
      checkView(elements[i])
    ) {
      animation(elements[i]);
      elements[i].classList.add("no-animation");
    }
  }
}

// Scramble animations
////////////////////////////////////////////////////////////////////////////////

var scrambleElements; // Get animation elements

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

function setupScramble(line) {
  splitLineIntoWords(line);
  for (let i = 0; i < line.children.length; i++) {
    const word = line.children.item(i);
    if (word) {
      word.style.transform = `rotate(${getRandom(3, -3)}deg`;
      splitWordIntoLetters(word);
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

function setupWrite(text) {
  splitTextIntoLines(text);
  for (let i = 0; i < text.children.length; i++) {
    const line = text.children.item(i);
    if (line) {
      splitWordIntoLetters(line);
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
    setupWrite(text);
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
