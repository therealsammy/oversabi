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

      if (emailFormat.test(email.value)) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/save_email.php", true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const response = xhr.responseText;
              console.log(response)
              // if (response.status === "success") {
              //   successMessage();
              // } else {
              //   emptyError(response.message);
              // }
            } else {
              emptyError("Sever Error");
            }
          }
        };
        const data = { "email": email.value };
        const json = JSON.stringify(data);
        xhr.send(json);
      } else {
        emptyError("Invalid email. Please enter a valid email address");
      }
    });
  }

  validate();

  function emptyError(message) {
    swal({
      title: "Sorry.",
      text: message,
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
