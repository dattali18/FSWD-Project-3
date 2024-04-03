import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactByName,
  updateContact,
} from "./src/routes/contactsRouts.js";
import {
  authenticateUser,
  logoutUser,
  registerUser,
} from "./src/routes/usersRouts.js";

// this will simulate an http server in js
const server = {
  // User management
  registerUser,
  authenticateUser,
  logoutUser,

  // Contact management
  getAllContacts,
  getContactByName,
  addContact,
  updateContact,
  deleteContact,
};

window.server = server;
