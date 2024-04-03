// this is the page we handle the submit for the sign up form

// Get a reference to the sign-in form element
const signUpForm = document.getElementById("signup-form");

// Add an event listener to the form's submit event
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values entered in the form fields
  const name = document.getElementById("sign-name").value;
  const email = document.getElementById("sign-email").value;
  const password = document.getElementById("sign-password").value;
  const confirmPassword = document.getElementById(
    "sign-confirm-password"
  ).value;

  // Perform any necessary validation on the form data
  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Create an object to hold the form data
  const formData = {
    name: name,
    email: email,
    password: password,
  };

  // Convert the form data object to JSON
  const data = JSON.stringify(formData);

  const request = new window.Fajax();
  request.open("POST", "/users/");
  request.onload = () => {
    if (request.status === 200) {
      console.log("Success:", request.status, request.message);
    } else {
      console.error("Error:", request.status, request.message);
    }
  };
  request.send(data);

  // Send the form data to the server for authentication
  // TODO: implement this after setting up the server
});
