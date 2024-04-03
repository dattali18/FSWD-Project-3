// import { database } from "../databases/database.js";

const database = window.database;

// this will simulate routes for the users Rest API

function registerUser(data) {
  // Check if user already exists
  console.log(data);
  let user = JSON.parse(data);

  const existingUser = database.users.getUser(user.name);

  if (existingUser) {
    return { status: "error", message: "User already exists" };
  }

  // Add new user to the database
  database.users.postUser(user);
  return { status: "success", message: "User registered successfully" };
}

function authenticateUser(name, email, password) {
  // Find user in the database
  let data = {
    name: name,
    email: email,
    password: password,
  };

  const user = database.users.getUser(data.name);

  if (!user) {
    return { status: "error", message: "Invalid email or password" };
  }

  if (user.email !== data.email || user.password !== data.password) {
    return { status: "error", message: "Invalid email or password" };
  }

  // Set current user
  database.currentUser.setUser(user);

  return { status: "success", message: "Successfully auth user", data: user };
}

function logoutUser() {
  database.currentUser.setUser(null);
  return { status: "success", message: "Successfully logged out" };
}

window.registerUser = registerUser;
window.authenticateUser = authenticateUser;
window.logoutUser = logoutUser;

// export default { registerUser, authenticateUser, logoutUser };
