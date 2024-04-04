// this file will be used to handle a contact form submit
// import { renderHomePage } from "./home";

function navigateToHome() {
  const homePage = document.getElementById("home");
  const contactPage = document.getElementById("contact-form-page");

  homePage.style.display = "block";
  contactPage.style.display = "none";

  // renderHomePage();
}

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const contact = {
    name: formData.get("contact-name"),
    phone: formData.get("contact-phone"),
    email: formData.get("contact-email"),
  };

  const request = new window.Fajax();
  request.open("POST", "/contacts/");
  request.onload = () => {
    if (request.status === 201) {
      console.log("Success:", request.response);
    } else {
      console.error("Error:", request.response);
    }
  };
  request.send(JSON.stringify(contact));

  // navigate back to the home page
  navigateToHome();
});
