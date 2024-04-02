// this file will handle the logic of the login page in our application

// add event listener to the form submit event
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent default form submission behavior

  // get the values from the form
  const name = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  // create an object to store the form data
  const formData = {
    name,
    password,
    email,
  };

  // convert the form data object to JSON
  const jsonData = JSON.stringify(formData);

  // TODO: send the form data to the backend
});
