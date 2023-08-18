// On window load
//////////////////////////////////////////////////////////////////////////
window.onload = () => {
  initButtons()
}

// Button Strike through effect
//////////////////////////////////////////////////////////////////////////
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
      const strike =
        button.querySelector(".button__strike");
      if (strike) {
        strike.src = strikeURL[getRandomInt(strikeURL.length)];
        strike.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 20 + 10}deg)`
      }
    });
  }
}
