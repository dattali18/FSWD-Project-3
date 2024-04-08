// this will simulate routes for the users routes for the Rest API
import database from "../databases/database.js";

function postUser(data) {
  // Check if user already exists
  let user = JSON.parse(data);

  const existingUser = database.users.getUser(user.name);

  if (existingUser) {
    return JSON.stringify({ status: "error", message: "User already exists" });
  }

  // Add new user to the database
  database.users.postUser(user);
  return JSON.stringify({
    status: "success",
    message: "User registered successfully",
  });
}

function postCurrentUser(data) {
  // Check if user exists
  data = JSON.parse(data);
  const user = database.users.getUser(data.name);

  if (!user) {
    return JSON.stringify({
      status: "error",
      message: "Invalid email or password",
    });
  }

  if (user.email !== data.email || user.password !== data.password) {
    return JSON.stringify({
      status: "error",
      message: "Invalid email or password",
    });
  }

  // Set current user
  database.currentUser.postCurrentUser(user);

  return JSON.stringify({
    status: "success",
    message: "Successfully auth user",
    data: user,
  });
}

function getCurrentUser() {
  const user = database.currentUser.getCurrentUser();

  if (!user) {
    return JSON.stringify({
      status: "error",
      message: "No user is currently logged in",
      data: null,
    });
  }
  return JSON.stringify({
    status: "success",
    message: "Successfully fetched current user",
    data: JSON.stringify(user),
  });
}

function deleteCurrentUser() {
  database.currentUser.logoutUser(null);
  return JSON.stringify({
    status: "success",
    message: "Successfully logged out",
  });
}

export { deleteCurrentUser, getCurrentUser, postCurrentUser, postUser };
