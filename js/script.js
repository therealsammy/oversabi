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
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Email JS

  function validate() {
    const email = document.querySelector(".email");
    const submit = document.querySelector(".subscribe-btn");
    const emailFormat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    submit.addEventListener("click", (e) => {
      e.preventDefault();

      if (email.value.match(emailFormat)) {
        // sendmail(email);
        // success;
        console.log("success");
      } else {
        // emptyerror();
        console.log("error");
      }
    });
  }

  validate();
})();
