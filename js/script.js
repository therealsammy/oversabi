(function () {
  "use strict";

  const menu = document.querySelector(".menu-icon");

  menu.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
})();
