import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactByName,
  updateContact,
} from "./src/routes/contactsRouts.js";

import {
  authenticateUser,
  getCurrentUser,
  logoutUser,
  registerUser,
} from "./src/routes/usersRouts.js";

// const {
//   addContact,
//   deleteContact,
//   getAllContacts,
//   getContactByName,
//   updateContact,
// } = window;
// const { getCurrentUser, authenticateUser, logoutUser, registerUser } = window;

// this will simulate an http server in js
const server = {
  // Contact management
  addContact,
  deleteContact,
  getAllContacts,
  getContactByName,
  updateContact,

  // User management
  authenticateUser,
  logoutUser,
  registerUser,
  getCurrentUser,
};

// console.log("server.js loaded!");

// window.server = server;

export default server;
