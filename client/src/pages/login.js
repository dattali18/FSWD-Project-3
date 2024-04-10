import { showBanner } from "../utils/banner.js";
import Fajax from "../utils/fajax.js";
import { renderHomePage } from "./home.js";

export function renderLoginPage() {
  // this file will handle the logic of the login page in our application
  const form = document.getElementById("login-form");
  // add event listener to the form submit event
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission behavior

    const formData = new FormData(form);
    const contact = {
      name: formData.get("name"),
      password: formData.get("password"),
      email: formData.get("email"),
    };

    // convert the form data object to JSON
    const data = JSON.stringify(contact);
    // Send the form data to the server for authentication
    let flag = false;
    const request = new Fajax();
    request.open("POST", "/auth/");
    request.onload = () => {
      if (request.status === 200) {
        flag = true;
        showBanner("Login successful", "green", "success");
        // console.log("Success:", request.status, request.message);
      } else {
        // console.error("Error:", request.status, request.message);
        // handle the error according the the problem
        showBanner("Login failed", "red", "error");
      }
    };
    request.send(data);

    // navigate to home page
    if (flag) {
      form.elements["name"].value = "";
      form.elements["password"].value = "";
      form.elements["email"].value = "";

      navigateToHome();
    }
  });
}

function navigateToHome() {
  const home = document.getElementById("home");
  const login = document.getElementById("login");
  home.style.display = "block";
  login.style.display = "none";

  // change the active link to home
  const homeLink = document.getElementById("homeLink");
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");
  homeLink.classList.add("active");
  loginLink.classList.remove("active");
  loginLink.style.display = "none";

  // display the logout link
  logoutLink.style.display = "block";
  // render the home page
  renderHomePage();
}

// console.log("login.js loaded!");
