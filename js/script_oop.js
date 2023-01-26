(function() {

  /**
   * This is a Immediately Invokes Function Expression
   * 
   * It contains the function that controns the:
   * Meuu Toggle
   * Image slider
   * Header background change
   */

  const menu = document.querySelector(".menu-icon");
  const navbar = document.querySelector(".navbar")

  menu.addEventListener("click", () => {
    navbar.classList.toggle("open-menu");
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
  })

  // Header Background Change on Scroll

  const header = document.querySelector("header");
  const scroolTop = document.querySelector(".scroll-top")

  window.addEventListener("scroll", () => {
    header.classList.toggle('header-active', window.scrollY > 0);
    scroolTop.classList.toggle('scroll-active', window.scrollY >= 400);
    navbar.classList.remove("open-menu");
    menu.classList.remove("show");
  })

})()


class Newsletter {

  /**
   * 
   * @param {string} emailSelector - This selects the email address class
   * @param {string} submitSelector - This selects the submit button class
   * @param {string} emailFormat - This is the regular expression format to check if email is valid
   */
  constructor(emailSelector, submitSelector) {
    this.email = document.querySelector(emailSelector);
    this.submit = document.querySelector(submitSelector);
    this.emailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.submit.addEventListener("click", (e) => {
      e.preventDefault();
      this.validateEmail();
    });
  }

  // Method to validate the email address
  validateEmail() {
    /**
     * This validates the email address and calls the saveEmail function
     */
    if (this.email.value.match(this.emailFormat)) {
      this.showSuccess();
      this.saveEmail();
    } else {
      this.showError("Invalid email. Please enter a valid email address");
    }
  }

  // Method to send the email address to the server
  saveEmail() {

    /**
     * This function saves the email to database
     * @param {string} xhr - Xml Http Response
     * @param {object} data - Object to be sent to sever
     * @param {object} response - xhr response text
     */
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/save_email.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        if (response.status === "success") {
          this.showSuccess();
        } else {
          this.showError(response.message);
        }
      }
    };
    const data = {
      "email": this.email.value
    };
    const json = JSON.stringify(data);
    xhr.send(json);
  }

  // Method to send email to the subscriber
  sendEmail() {

    /**
     * This method does not work yet... 
     * Do not call this method in the saveEmail() method
     * This method sends a welcome email to new subscribers
     * Currently, the PHP code handles this when an emil is added to the database.
     */
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/send_email.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
      }
    };
    const data = {
      "email": this.email.value
    };
    const json = JSON.stringify(data);
    xhr.send(json);
  }

  // Method to show success message
  showSuccess() {
    /**
     * This uses the swal function to send messages to the user
     */
    swal({
      title: "Success",
      text: "Thank you for subscribing to our newsletter service.",
      icon: "success",
    });
  }

  // Method to show error message
  showError(message) {
    swal({
      /**
       * This uses the swal function to send messages to the user
       */
      title: "Sorry.",
      text: message,
      icon: "error",
    });
  }
}
// Initialize the Newsletter class
const newsletter = new Newsletter(".email", ".subscribe-btn");