// On content loaded
////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  initButtons();
  initScramble();
  initWrite();
});

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

// Text animations
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

function randomLetterLocation(letter) {
  letter.style.transform = `translateX(${getRandom(
    50,
    -50
  )}px) translateY(${getRandom(0, 100)}px) rotate(${getRandom(20, -20)}deg`;
}

function scramble(line) {
  splitLineIntoWords(line);
  for (let i = 0; i <= line.children.length; i++) {
    const word = line.children.item(i);
    if (word) {
      word.style.transform = `rotate(${getRandom(3, -3)}deg`;
      splitWordIntoLetters(word);
      for (let i = 0; i <= word.children.length; i++) {
        const letter = word.children.item(i);
        if (letter) {
          letter.style.transitionTimingFunction = `cubic-bezier(${getRandom(
            1,
            0.8
          )},${getRandom(0.2, 0)},${getRandom(0.2, 0)},${getRandom(1, 0.8)})`;

          letter.style.transform = `translateX(${getRandom(
            10,
            -10
          )}px) translateY(${getRandom(50, 300)}px) rotate(${getRandom(
            40,
            -40
          )}deg`;

          setTimeout(() => {
            letter.style.transform = `rotate(${getRandom(4, -4)}deg`;
          }, 10);
        }
      }
    }
  }
}

function write(text) {
  splitTextIntoLines(text);
  for (let i = 0; i <= text.children.length; i++) {
    const line = text.children.item(i);
    if (line) {
      splitWordIntoLetters(line);
      for (let i = 0; i <= line.children.length; i++) {
        const letter = line.children.item(i);
        if (letter) {
          letter.classList.add("hidden");
          setTimeout(() => {
            letter.classList.remove("hidden");
          }, i * 40 + 200);
        }
      }
    }
  }
}

function initScramble() {
  const lines = document.getElementsByClassName("scramble");
  for (const line of lines) {
    scramble(line);
  }
}

function initWrite() {
  const texts = document.getElementsByClassName("write");
  for (const text of texts) {
    write(text);
  }
}

// Scroll
////////////////////////////////////////////////////////////////////////////////
var lastScrollTop = 0;
const triggers = document.getElementsByClassName("animation-trigger");

window.addEventListener("scroll", (event) => {
  var scrollTop = this.scrollTop;

  // toggleHeader(scrollTop);

  for (const trigger of triggers) {
    animateKeyframes(trigger);
  }

  lastScrollTop = scrollTop;
});

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

// Animations
////////////////////////////////////////////////////////////////////////////////
function animateKeyframes(element) {
  var elementTop = element.offsetTop,
    elementHeight = element.offsetHeight,
    windowTop = window.scrollTop,
    windowHeight = window.innerHeight;

  // 0% means element has come into view, 100% means element has left view.
  var percentage =
    (windowTop + windowHeight - elementTop) / (windowHeight + elementHeight);
  if (percentage >= 0 && percentage <= 1) {
    element.find(".animation-target").css("--scroll", percentage);
  }
}
