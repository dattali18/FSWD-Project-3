// this is the page we handle the submit for the sign up form

// Get a reference to the sign-in form element
const signUpForm = document.getElementById('signUpForm');

// Add an event listener to the form's submit event
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Get the values entered in the form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform any necessary validation on the form data
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    // Create an object to hold the form data
    const formData = {
        email: email,
        password: password
    };

    // Convert the form data object to JSON
    const jsonData = JSON.stringify(formData);

    // Send the form data to the server for authentication
    // TODO: implement this after setting up the server
});