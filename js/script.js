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
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../php/save_email.php", true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
              alert(response.message);
            } else {
              alert(response.message);
            }
          }
        };
        xhr.send(email);
      } else {
        emptyError();
      }
    });
  }

  validate();

  function emptyError() {
    swal({
      title: "Sorry.",
      text: "Invalid email. Please enter a valid email address",
      icon: "error",
    });
  }

  function successMessage() {
    swal({
      title: "Success",
      text: "Thank you for subscribing to our newsletter service.",
      icon: "success",
    });
  }
})();
