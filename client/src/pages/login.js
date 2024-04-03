// this file will handle the logic of the login page in our application
const loginForm = document.getElementById("login-form");

// add event listener to the form submit event
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent default form submission behavior
  // get the values from the form
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  // create an object to store the form data
  const formData = {
    name,
    password,
    email,
  };

  // convert the form data object to JSON
  const data = JSON.stringify(formData);
  // Send the form data to the server for authentication
  const request = new window.Fajax();
  request.open("POST", "/auth/");
  request.onload = () => {
    if (request.status === 200) {
      console.log("Success:", request.status, request.message);
    } else {
      console.error("Error:", request.status, request.message);
    }
  };
  request.send(data);

  // navigate to home page
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
});
