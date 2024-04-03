// this file will handle the logic of the login page in our application

// add event listener to the form submit event
export function handleSubmitLogin() {
  const loginForm = document.getElementById("login-form");
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
    console.log(data);
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
  });
}
