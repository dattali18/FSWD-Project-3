// this file will be used to handle a contact form submit
import Fajax from "../utils/fajax.js";

import { showBanner } from "../utils/banner.js";
import { renderPage } from "../utils/navigation.js";
import { renderHomePage } from "./home.js";

let submitForm;
let object = null;

const form = document.getElementById("contact-form");
form.addEventListener("submit", async (event) => submitForm(event));

export function renderContactFormPage(contactInfo = null) {
  form.elements["contact-name"].value = "";
  form.elements["contact-phone"].value = "";
  form.elements["contact-email"].value = "";
  // removing all the old event listeners

  // put the contact info in the form
  if (contactInfo) {
    const contact = contactInfo.contact;
    form.elements["contact-name"].value = contact.name;
    form.elements["contact-phone"].value = contact.phone;
    form.elements["contact-email"].value = contact.email;
  }

  object = contactInfo;
}

submitForm = (event) => {
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
  if (object) {
    const url = "/contacts/" + object.id;
    request.open("PUT", url);
  }
  request.onload = () => {
    if (request.status === 201 || request.status === 200) {
      flag = true;
      // console.log("Success:", request.response);
      showBanner("Contact saved successfully!", "green", "success");
    } else {
      // console.error("Error:", request.message);
      showBanner("Error saving contact!", "red", "error");
    }
  };
  request.send(JSON.stringify(contact));

  // navigate back to the home page
  if (flag) {
    form.elements["contact-name"].value = "";
    form.elements["contact-phone"].value = "";
    form.elements["contact-email"].value = "";

    renderHomePage();
    renderPage("#home");
  }
};
// console.log("contactForm.js loaded!");
