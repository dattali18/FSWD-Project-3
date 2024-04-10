import { showBanner } from "../utils/banner.js";
import Fajax from "../utils/fajax.js";
import { activateLink, renderPage } from "../utils/navigation.js";
// this is the page we handle the submit for the sign up form
// Get a reference to the sign-in form element

export function renderSignUpPage() {
  const signUpForm = document.getElementById("signup-form");

  // Add an event listener to the form's submit event
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Get the values entered in the form fields
    const nameFiled = document.getElementById("sign-name");
    const emailFiled = document.getElementById("sign-email");
    const passwordFiled = document.getElementById("sign-password");
    const confirmPasswordFiled = document.getElementById(
      "sign-confirm-password"
    );

    const name = nameFiled.value;
    const email = emailFiled.value;
    const password = passwordFiled.value;
    const confirmPassword = confirmPasswordFiled.value;

    // Perform any necessary validation on the form data
    if (!email || !password) {
      // alert("Please enter both email and password");
      showBanner("Please enter both email and password", "red", "error");
      return;
    }

    if (password !== confirmPassword) {
      // alert("Passwords do not match");
      showBanner("Passwords do not match", "red", "error");
      return;
    }

    // Create an object to hold the form data
    const formData = {
      name: name,
      email: email,
      password: password,
    };

    // Convert the form data object to JSON
    // Send the form data to the server for authentication
    let flag = false;
    const request = new Fajax();
    request.open("POST", "/users/");
    request.onload = () => {
      if (request.status === 200) {
        flag = true;
        // console.log("Success:", request.status, request.message);
      } else {
        // console.error("Error:", request.status, request.message);
      }
    };
    request.send(JSON.stringify(formData));

    // Clear the form fields
    nameFiled.value = "";
    emailFiled.value = "";
    passwordFiled.value = "";
    confirmPasswordFiled.value = "";

    if (flag) {
      // Display the login page
      renderPage("#login");

      // activate login link
      activateLink("#login");

      // show a success message
      showBanner("Sign up successful", "green", "success");
    } else {
      // show an error message
      showBanner("Sign up failed", "red", "error");
    }
  });
}

// console.log("signup.js loaded!");
