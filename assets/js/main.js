// On content loaded
////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  setTextSize();

  initializeAnimation("pop", popElements, setupPop);
  initializeAnimation("write", writeElements, setupWrite);
  initializeAnimation("scramble", scrambleElements, setupScramble);

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

// Scroll to function
////////////////////////////////////////////////////////////////////////////////
function scrollToElement(id) {
  const element = document.getElementById(id);
  const elementY = element.getBoundingClientRect().top;
  if (!elementY) {
    return;
  }
  const diff = elementY - window.scrollY;
  const duration = diff / 6;

  customScroll(element, duration);
}

// c = element to scroll to or top position in pixels
// e = duration of the scroll in ms, time scrolling
// d = (optative) ease function. Default easeOutCuaic
// From:
// prettier-ignore
function customScroll(c,e,d){d||(d=easeOutCuaic);
  var a=document.documentElement;
  if(0===a.scrollTop){var b=a.scrollTop;
  ++a.scrollTop;a=b+1===a.scrollTop--?a:document.body}
  b=a.scrollTop;0>=e||("object"===typeof b&&(b=b.offsetTop),
  "object"===typeof c&&(c=c.offsetTop),function(a,b,c,f,d,e,h){
  function g(){0>f||1<f||0>=d?a.scrollTop=c:(a.scrollTop=b-(b-c)*h(f),
  f+=d*e,setTimeout(g,e))}g()}(a,b,c,0,1/e,20,d))}
function easeOutCuaic(t) {
  t--;
  return t * t * t + 1;
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
