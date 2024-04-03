import { renderHomePage } from "./pages/home.js";
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

const links = { "#login": loginLink, "#signup": signupLink, "#home": homeLink };

function renderPage(pageId) {
  const pages = ["#login", "#signup", "#home"];
  pages.forEach((page) => {
    const pageElement = document.querySelector(page);

    if (page === pageId) {
      pageElement.style.display = "block";
    } else {
      pageElement.style.display = "none";
    }
  });
}

function activateLink(linkId) {
  for (let link in links) {
    if (link === linkId) {
      links[link].classList.add("active");
    } else {
      links[link].classList.remove("active");
    }
  }
}

function navigateTo(pageId) {
  renderPage(pageId);
  activateLink(pageId);

  if (pageId === "#login") {
    // Call functions from login.js
    // handleSubmitLogin();
  } else if (pageId === "#signup") {
    // Call functions from signup.js
  } else if (pageId === "#home") {
    renderHomePage();
    // Call functions from home.js
  } else if (pageId === "#logout") {
    // Call functions from logout.js
    renderLogoutPage();
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

  const request = new window.Fajax();
  request.open("GET", "/auth/");
  request.onload = () => {
    if (request.status === 200) {
      userAuth = true;
      console.log("Success:", request.status, request.message);
    } else {
      console.error("Error:", request.status, request.message);
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
  const request = new window.Fajax();
  request.open("DELETE", "/auth/");
  request.onload = () => {
    if (request.status === 200) {
      console.log("Success:", request.data);
    } else {
      console.error("Error:", request.response);
    }
  };
  request.send();

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
  const logoutLink = document.getElementById("logoutLink");
  homeLink.classList.remove("active");
  loginLink.classList.add("active");
  
  // hide the logout link
  displayLoginLink();
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
const request = new window.Fajax();
request.open("GET", "/auth/");
request.onload = () => {
  if (request.status === 200) {
    userAuth = true;
    console.log("Success:", request.status, request.message);
  } else {
    console.error("Error:", request.status, request.message);
  }
};
request.send();

if (userAuth) {
  displayLogoutLink();
  navigateTo("#home");
}
