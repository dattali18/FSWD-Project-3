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

export function renderContactFormPage(contactInfo = null) {
  console.log("Rendering contact form page");
  // put the contact info in the form
  const form = document.getElementById("contact-form");

  if (contactInfo) {
    const contact = contactInfo.contact;
    form.elements["contact-name"].value = contact.name;
    form.elements["contact-phone"].value = contact.phone;
    form.elements["contact-email"].value = contact.email;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const contact = {
      name: formData.get("contact-name"),
      phone: formData.get("contact-phone"),
      email: formData.get("contact-email"),
    };

    form.elements["contact-name"].value = "";
    form.elements["contact-phone"].value = "";
    form.elements["contact-email"].value = "";

    let flag = false;
    const request = new Fajax();
    request.open("POST", "/contacts/");
    if (contactInfo) {
      const url = "/contacts/" + contactInfo.id;
      console.log(url);
      request.open("PUT", url);
    }
    request.onload = () => {
      if (request.status === 201 || request.status === 200) {
        flag = true;
        console.log("Success:", request.response);
      } else {
        console.error("Error:", request.message);
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
