import database from "../databases/database.js";

// const database = window.database;

// this will simulate routes for the users Rest API

function registerUser(data) {
  // Check if user already exists
  let user = JSON.parse(data);

  const existingUser = database.users.getUser(user.name);

  if (existingUser) {
    return { status: "error", message: "User already exists" };
  }

  // Add new user to the database
  database.users.postUser(user);
  return { status: "success", message: "User registered successfully" };
}

function authenticateUser(data) {
  // Check if user exists
  data = JSON.parse(data);
  const user = database.users.getUser(data.name);

  if (!user) {
    return { status: "error", message: "Invalid email or password" };
  }

  if (user.email !== data.email || user.password !== data.password) {
    return { status: "error", message: "Invalid email or password" };
  }

  // Set current user
  database.currentUser.postCurrentUser(user);

  return { status: "success", message: "Successfully auth user", data: user };
}

function getCurrentUser() {
  const user = database.currentUser.getCurrentUser();

  if (!user) {
    return {
      status: "error",
      message: "No user is currently logged in",
      data: null,
    };
  }
  return {
    status: "success",
    message: "Successfully fetched current user",
    data: user,
  };
}

function logoutUser() {
  database.currentUser.logoutUser(null);
  return { status: "success", message: "Successfully logged out" };
}

// console.log("usersRoutes.js loaded!");

// window.registerUser = registerUser;
// window.authenticateUser = authenticateUser;
// window.logoutUser = logoutUser;
// window.getCurrentUser = getCurrentUser;

export { authenticateUser, getCurrentUser, logoutUser, registerUser };
