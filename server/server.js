import { database } from "./databases/database.js";

// this will simulate an http server in js
const server = {
  registerUser(user) {
    // Check if user already exists
    const existingUser = database.users.getUser(user.name);

    if (existingUser) {
      return { status: "error", message: "User already exists" };
    }

    // Add new user to the database
    database.users.postUser(user);
    return { status: "success", message: "User registered successfully" };
  },

  authenticateUser(name, email, password) {
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
  },

  logoutUser() {
    database.currentUser.setUser(null);
    return { status: "success", message: "Successfully logged out" };
  },

  // Contact management
  getAllContacts() {
    if (!database.currentUser.getUser()) {
      return { status: "error", message: "Unauthorized" };
    }

    return {
      status: "success",
      message: "Successfully retrieved contacts",
      data: database.contacts
        .getAllContacts()
        .find((c) => c.user === database.currentUser.getUser().name),
    };
  },

  getContactByName(name) {
    if (!database.currentUser.getUser()) {
      return { status: "error", message: "Unauthorized" };
    }
    return {
      status: "success",
      message: "Successfully retrieved contact by name",
      data: this.getAllContacts().find((c) => c.name === name),
    };
  },

  addContact(contact) {
    if (!database.currentUser.getUser()) {
      return { status: "error", message: "Unauthorized" };
    }
    contact.id = database.contacts.getAllContacts().length + 1;
    // Generate a unique ID for the new contact
    const res = database.contacts.postContact(
      contact,
      database.currentUser.getUser().name
    );
    if (!res) {
      return {
        status: "error",
        message: "Failed to add contact",
      };
    }

    return {
      status: "success",
      message: "Successfully added contact",
      data: contact,
    };
  },

  updateContact(id, updatedContact) {
    const res = database.contacts.putContact(
      id,
      updatedContact,
      database.currentUser.getUser().name
    );
    if (!res) {
      return {
        status: "error",
        message: "Failed to update contact",
      };
    }
    return {
      status: "success",
      message: "Successfully updated contact",
      data: updatedContact,
    };
  },

  deleteContact(id) {
    const res = database.contacts.deleteContact(
      id,
      database.currentUser.getUser().name
    );
    if (!res) {
      return {
        status: "error",
        message: "Failed to delete contact",
      };
    }
    return {
      status: "success",
      message: "Successfully deleted contact",
    };
  },
};
