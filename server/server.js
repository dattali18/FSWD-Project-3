import {
  deleteContact,
  getContactByName,
  getContacts,
  postContact,
  putContact,
} from "./src/routes/contactsRouts.js";

import {
  getCurrentUser,
  postCurrentUser,
  postUser,
  deleteCurrentUser,
} from "./src/routes/usersRouts.js";

// this will simulate an http server in js
const server = {
  // Contact management
  postContact,
  deleteContact,
  getContacts,
  getContactByName,
  putContact,

  // User management
  postCurrentUser,
  postUser,
  deleteCurrentUser,
  getCurrentUser,
};

// console.log("server.js loaded!");

export default server;
