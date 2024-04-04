// this file will be used to handle a contact form submit
import Fajax from "../utils/fajax.js";
import { renderHomePage } from "./home.js";

function navigateToHome() {
  const homePage = document.getElementById("home");
  const contactPage = document.getElementById("contact-form-page");

  homePage.style.display = "block";
  contactPage.style.display = "none";

  renderHomePage();
}

export function renderContactFormPage() {
  console.log("Rendering contact form page");
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const contact = {
      name: formData.get("contact-name"),
      phone: formData.get("contact-phone"),
      email: formData.get("contact-email"),
    };

    let flag = false;
    const request = new Fajax();
    request.open("POST", "/contacts/");
    request.onload = () => {
      if (request.status === 201) {
        flag = true;
        console.log("Success:", request.response);
      } else {
        console.error("Error:", request.response);
      }
    };
    request.send(JSON.stringify(contact));

    // navigate back to the home page
    if (flag) {
      navigateToHome();
    }
  });
}

console.log("contactForm.js loaded!");
