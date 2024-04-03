// import { database } from "../databases/database.js";

const database = window.database;

function getAllContacts() {
  if (!database.currentUser.getCurrentUser()) {
    return { status: "error", message: "Unauthorized", data: null };
  }

  return {
    status: "success",
    message: "Successfully retrieved contacts",
    data:
      database.contacts
        .getContacts()
        .find((c) => c.user === database.currentUser.getCurrentUser().name) ||
      [],
  };
}

function getContactByName(name) {
  if (!database.currentUser.getCurrentUser()) {
    return { status: "error", message: "Unauthorized", data: null };
  }

  const contacts =
    database.contacts
      .getAllContacts()
      .find((c) => c.user === database.currentUser.getCurrentUser().name) || [];

  return {
    status: "success",
    message: "Successfully retrieved contact by name",
    data: contacts.find((c) => c.name === name),
  };
}

function addContact(contact) {
  if (!database.currentUser.getCurrentUser()) {
    return { status: "error", message: "Unauthorized", data: null };
  }
  contact.id = database.contacts.getAllContacts().length + 1;
  // Generate a unique ID for the new contact
  const res = database.contacts.postContact(
    contact,
    database.currentUser.getCurrentUser().name
  );
  if (!res) {
    return {
      status: "error",
      message: "Failed to add contact",
      data: null,
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
    database.currentUser.getCurrentUser().name
  );
  if (!res) {
    return {
      status: "error",
      message: "Failed to update contact",
      data: null,
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
    database.currentUser.getCurrentUser().name
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

window.getAllContacts = getAllContacts;
window.getContactByName = getContactByName;
window.addContact = addContact;
window.updateContact = updateContact;
window.deleteContact = deleteContact;

// export default {
//   getAllContacts,
//   getContactByName,
//   addContact,
//   updateContact,
//   deleteContact,
// };
