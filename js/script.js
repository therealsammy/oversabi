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

  // Validate email address and check if it's already in the database
  function validate() {
    const email = document.querySelector(".email");
    const submit = document.querySelector(".subscribe-btn");
    const emailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      

    submit.addEventListener("click", (e) => {
      e.preventDefault();

      if (email.value.match(emailFormat)) {
        // Send the email address to the server to save to the database
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/save_email.php", true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // Get the response from the server

            let response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response.status === "success") {
              // Show success message
              successMessage();
              // Send email to the subscriber
              const xhr2 = new XMLHttpRequest();
              xhr2.open("POST", "./php/send_email.php", true);
              xhr2.setRequestHeader("Content-type", "application/json");
              xhr2.onreadystatechange = function () {
                if (xhr2.readyState === 4 && xhr2.status === 200) {
                  // Get the response from the server after sending email
                  let emailResponse = JSON.parse(xhr2.responseText);
                  console.log(emailResponse);
                }
              };
              const data = { email: email.value };
              const json = JSON.stringify(data);
              xhr2.send(json);
            } else {
              // Show error message
              errorMessage(response.message);
            }
          }
        };
        const data = { email: email.value };
        const json = JSON.stringify(data);
        xhr.send(json);
      } else {
        // Show error message
        errorMessage("Invalid email. Please enter a valid email address");
      }
    });
  }

  validate();

  // Show error message
  function errorMessage(message) {
    swal({
      title: "Sorry.",
      text: message,
      icon: "error",
    });
  }

  // Show success message
  function successMessage() {
    swal({
      title: "Success",
      text: "Thank you for subscribing to our newsletter service.",
      icon: "success",
    });
  }
})();
