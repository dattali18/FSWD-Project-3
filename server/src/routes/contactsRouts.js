import { database } from "../databases/database.js";

function getAllContacts() {
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
}

function getContactByName(name) {
  if (!database.currentUser.getUser()) {
    return { status: "error", message: "Unauthorized" };
  }
  return {
    status: "success",
    message: "Successfully retrieved contact by name",
    data: this.getAllContacts().find((c) => c.name === name),
  };
}

function addContact(contact) {
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
}

function updateContact(id, updatedContact) {
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
}

function deleteContact(id) {
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
}

export default {
  getAllContacts,
  getContactByName,
  addContact,
  updateContact,
  deleteContact,
};
