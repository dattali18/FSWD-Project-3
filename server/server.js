const {
  addContact,
  deleteContact,
  getAllContacts,
  getContactByName,
  updateContact,
} = window;
const { getCurrentUser, authenticateUser, logoutUser, registerUser } = window;

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

console.log("Server initialized");

window.server = server;
