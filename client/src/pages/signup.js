import { showBanner } from "../utils/banner.js";
import Fajax from "../utils/fajax.js";
import { activateLink, renderPage } from "../utils/navigation.js";
// this is the page we handle the submit for the sign up form
// Get a reference to the sign-in form element
let submitForm; // this will be the function called when the form is submitted

const signUpForm = document.getElementById("signup-form");
signUpForm.addEventListener("submit", (event) => submitForm(event));

export function renderSignUpPage() {
  // Add an event listener to the form's submit event
  submitForm = (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const formData = new FormData(form);
    const contact = {
      name: formData.get("sing-name"),
      password: formData.get("sign-password"),
      email: formData.get("sign-email"),
      confirmPassword: formData.get("sign-confirm-password"),
    };

    // Perform any necessary validation on the form data
    if (!contact.email || !contact.password) {
      // alert("Please enter both email and password");
      showBanner("Please enter both email and password", "red", "error");
      return;
    }

    if (contact.password !== contact.confirmPassword) {
      // alert("Passwords do not match");
      showBanner("Passwords do not match", "red", "error");
      return;
    }

    // Convert the form data object to JSON
    // Send the form data to the server for authentication
    let flag = false;
    const request = new Fajax();
    request.open("POST", "/users/");
    request.onload = () => {
      if (request.status === 200) {
        flag = true;
        // console.log("Success:", request.status, request.message);
        showBanner("Sign up successful", "green", "success");
      } else {
        // console.error("Error:", request.status, request.message);
        showBanner("Sign up failed", "red", "error");
      }
    };
    request.send(JSON.stringify(contact));

    if (flag) {
      // Clear the form fields
      form.elements["sign-name"].value = "";
      form.elements["sign-password"].value = "";
      form.elements["sign-email"].value = "";
      form.elements["sign-confirm-password"].value = "";

      // Display the login page
      renderPage("#login");

      // activate login link
      activateLink("#login");
    }
  };
}

// console.log("signup.js loaded!");
