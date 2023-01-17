(function () {
  "use strict";

  // Menu bar

  const menu = document.querySelector(".menu-icon");

  menu.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Reviews Swiper

  const swiper = new Swiper(".reviews-content", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
  });
})();
