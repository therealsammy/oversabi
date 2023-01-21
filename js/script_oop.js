(() => {
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
  })
})()






class Newsletter {
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
    if (this.email.value.match(this.emailFormat)) {
        this.showSuccess();
      this.saveEmail();      
    } else {
      this.showError("Invalid email. Please enter a valid email address");
    }
  }

  // Method to send the email address to the server
  saveEmail() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/save_email.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        if (response.status === "success") {
          this.showSuccess();
          // this.sendEmail();
        } else {
          this.showError(response.message);
        }
      }
    };
    const data = { "email": this.email.value };
    const json = JSON.stringify(data);
    xhr.send(json);
  }

  // Method to send email to the subscriber
  sendEmail() {

    /**
     * This method does not work yet.
     * Do not call this method in the saveEmail() method
     * 
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
    const data = { "email": this.email.value };
    const json = JSON.stringify(data);
    xhr.send(json);
  }

  // Method to show success message
  showSuccess() {
    swal({
      title: "Success",
      text: "Thank you for subscribing to our newsletter service.",
      icon: "success",
    });
  }

  // Method to show error message
  showError(message) {
    swal({
      title: "Sorry.",
      text: message,
      icon: "error",
    });
  }
}
// Initialize the Newsletter class
const newsletter = new Newsletter(".email", ".subscribe-btn");
