// On window load
//////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
});

// Menu
//////////////////////////////////////////////////////////////////////////
var items;
var menuSelect;
var menu;

function initMenu() {
  items = document.getElementsByClassName("menu__item");
  menuSelect = document.getElementsByClassName("menus__select__item");
  menu = document.getElementById("menu");

  if (menuSelect[0]) {
    toggleMenu(menuSelect[0]);
  }
}

function toggleMenu(element) {
  const originalHeight = menu.offsetHeight;
  menu.style.height = `${originalHeight}px`;

  const menuId = element.dataset.menu;
  for (const item of items) {
    if (item.dataset.menu === menuId) {
      item.classList.add("show");
      item.classList.remove("hide");
    } else {
      item.classList.remove("show");
      item.classList.add("hide");
    }
  }

  var newHeight = 0;
  for (const child of menu.children) {
    newHeight += child.offsetHeight;
  }

  menu.style.height = `${newHeight}px`;

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
