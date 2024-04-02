import { handleSubmitLogin } from "./pages/login.js";
// this is the entry point of the application

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

function navigateTo(pageId) {
  renderPage(pageId);

  if (pageId === "#login") {
    // Call functions from login.js
    handleSubmitLogin();
  } else if (pageId === "#signup") {
    // Call functions from signup.js
  } else if (pageId === "#home") {
    // Call functions from home.js
  }
}

document.getElementById("loginLink").addEventListener("click", () => {
  navigateTo("#login");
});

document.getElementById("signupLink").addEventListener("click", () => {
  navigateTo("#signup");
});

document.getElementById("homeLink").addEventListener("click", () => {
  navigateTo("#home");
});
