import Fajax from "./utils/fajax.js";

import { renderContactFormPage } from "./pages/contactForm.js";
import { renderHomePage } from "./pages/home.js";
import { renderLoginPage } from "./pages/login.js";
import { renderSignUpPage } from "./pages/signup.js";
import { showBanner } from "./utils/banner.js";
import { activateLink, renderPage } from "./utils/navigation.js";

// console.log("index.js loaded!");

const plusButton = document.getElementById("plus-button");

plusButton.addEventListener("click", () => {
  navigateTo("#contact-form-page");
});

// this is the entry point of the application

const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const homeLink = document.getElementById("homeLink");
const logoutLink = document.getElementById("logoutLink");

function displayLogoutLink() {
  loginLink.style.display = "none";
  logoutLink.style.display = "block";
}

function displayLoginLink() {
  loginLink.style.display = "block";
  logoutLink.style.display = "none";
}

function navigateTo(pageId) {
  renderPage(pageId);
  activateLink(pageId);

  if (pageId === "#login") {
    // Call functions from login.js
    renderLoginPage();
  } else if (pageId === "#signup") {
    // Call functions from signup.js
    renderSignUpPage();
  } else if (pageId === "#home") {
    renderHomePage();
    // Call functions from home.js
  } else if (pageId === "#contact-form-page") {
    // Call functions from contactForm.js
    renderContactFormPage();
  }
}

loginLink.addEventListener("click", () => {
  navigateTo("#login");
});

signupLink.addEventListener("click", () => {
  navigateTo("#signup");
});

homeLink.addEventListener("click", () => {
  let userAuth = false;

  // const request = new window.Fajax();
  const request = new Fajax();
  request.open("GET", "/auth/");
  request.onload = () => {
    if (request.status === 200) {
      userAuth = true;
      // console.log("Success:", request.status, request.message);
      showBanner(`Welcome ${user.name}!`, "green", "success");
    } else {
      // console.error("Error:", request.status, request.message);
      showBanner("Please login to continue", "yellow", "warning");
    }
  };
  request.send();

  if (userAuth) {
    navigateTo("#home");
  } else {
    navigateTo("#login");
  }
});

logoutLink.addEventListener("click", () => {
  // client-side code
  let flag = false;
  const request = new Fajax();
  request.open("DELETE", "/auth/");
  request.onload = () => {
    if (request.status === 200) {
      flag = true;
      // console.log("Success:", request.message);
      showBanner("Logout successful", "green", "success");
    } else {
      // console.error("Error:", request.message);
      showBanner("Logout failed", "red", "error");
    }
  };
  request.send();

  if (flag) {
    // display the login page
    const home = document.getElementById("home");
    const login = document.getElementById("login");
    const signup = document.getElementById("signup");
    home.style.display = "none";
    signup.style.display = "none";
    login.style.display = "block";

    // display the login link
    const homeLink = document.getElementById("homeLink");
    const loginLink = document.getElementById("loginLink");
    // const logoutLink = document.getElementById("logoutLink");
    homeLink.classList.remove("active");
    loginLink.classList.add("active");

    // hide the logout link
    displayLoginLink();

    // show the success message
    showBanner("Logout successful", "green", "success");
  } else {
    // show the error message
    showBanner("Logout failed", "red", "error");
  }
});

document.getElementById("signup-link").addEventListener("click", () => {
  navigateTo("#signup");
});

document.getElementById("login-link").addEventListener("click", () => {
  navigateTo("#login");
});

// check if the user is authenticated
// if the user is authenticated, redirect to the home page
let userAuth = false;
let user = {};
const request = new Fajax();
request.open("GET", "/auth/");
request.onload = () => {
  if (request.status === 200) {
    userAuth = true;
    user = JSON.parse(request.response);
    // console.log("Success:", request.status, request.message);
    showBanner(`Welcome ${user.name}!`, "green", "success");
  } else {
    // console.error("Error:", request.status, request.message);
    showBanner("Please login to continue", "yellow", "warning");
  }
};
request.send();

if (userAuth) {
  displayLogoutLink();
  navigateTo("#home");

  // display welcome banner
  showBanner(`Welcome ${user.name}!`, "green", "success");
} else {
  displayLoginLink();
  navigateTo("#login");
}
