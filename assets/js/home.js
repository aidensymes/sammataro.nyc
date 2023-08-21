// Test
// On window load
//////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
});

// Menu
//////////////////////////////////////////////////////////////////////////
var items, menuSelect, menu, fade, buttonOpen, buttonClose;
var menuOpen = false;
var menuHeight = 320;

function getMenuHeight(menu) {
  var newHeight = 0;
  for (const child of menu.children) {
    newHeight += child.offsetHeight;
  }
  return newHeight;
}

function initMenu() {
  items = document.getElementsByClassName("menu__item");
  menuSelect = document.getElementsByClassName("menus__select__item");
  menu = document.getElementById("menu");
  fade = document.getElementById("menu__fade");
  buttonOpen = document.getElementsByClassName("menu__bottom__open")[0];
  buttonClose = document.getElementsByClassName("menu__bottom__close")[0];

  if (menuSelect[0]) {
    toggleMenu(menuSelect[0]);
    closeMenu();
    menuOpen = false;
  }
}

function toggleMenu(element) {
  const menuId = element.dataset.menu;
  const text = buttonOpen.querySelector("h3");
  text.innerText = `See all ${element.dataset.menu}`;

  let itemCount = 0;
  for (const item of items) {
    if (item.dataset.menu === menuId) {
      item.classList.add("show");
      item.classList.remove("hide");
      itemCount++;
    } else {
      item.classList.remove("show");
      item.classList.add("hide");
    }
  }

  if (itemCount <= 3) {
    buttonOpen.classList.add("hide");
    buttonClose.classList.add("hide");
  } else if (menuOpen) {
    menu.style.height = `${getMenuHeight(menu)}px`;
    buttonOpen.classList.add("hide");
    buttonClose.classList.remove("hide");
  } else if (!menuOpen) {
    buttonOpen.classList.remove("hide");
    buttonClose.classList.add("hide");
  }

  for (const option of menuSelect) {
    if (option.dataset.menu === menuId) {
      option.classList.add("selected");
      option.querySelector(".check").classList.add("selected");
    } else {
      option.classList.remove("selected");
      option.querySelector(".check").classList.remove("selected");
    }
  }
}

function openMenu(element) {
  menu.style.height = `${getMenuHeight(menu)}px`;
  fade.classList.add("hide");
  buttonOpen.classList.add("hide");
  buttonClose.classList.remove("hide");
  menuOpen = true;
}

function closeMenu(element) {
  menu.style.height = `${menuHeight}px`;
  fade.classList.remove("hide");
  buttonOpen.classList.remove("hide");
  buttonClose.classList.add("hide");
  menuOpen = false;
}
