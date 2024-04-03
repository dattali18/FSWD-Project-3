import { renderHomePage } from "./pages/home.js";
// import { handleSubmitLogin } from "./pages/login.js";
// this is the entry point of the application

const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const homeLink = document.getElementById("homeLink");

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
  }
}

loginLink.addEventListener("click", () => {
  navigateTo("#login");
});

signupLink.addEventListener("click", () => {
  navigateTo("#signup");
});

homeLink.addEventListener("click", () => {
  let user;
  let userAuth = false;

  const request = new window.Fajax();
  request.open("GET", "/auth/");
  request.onload = () => {
    if (request.status === 200) {
      user = request.response;
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

document.getElementById("signup-link").addEventListener("click", () => {
  navigateTo("#signup");
});

document.getElementById("login-link").addEventListener("click", () => {
  navigateTo("#login");
});
