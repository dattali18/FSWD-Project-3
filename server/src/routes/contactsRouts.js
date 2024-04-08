// this will simulate routes for the contact routes for the Rest API
import database from "../databases/database.js";

function getContacts() {
  if (!database.currentUser.getCurrentUser()) {
    return JSON.stringify({
      status: "error",
      message: "Unauthorized",
      data: null,
    });
  }

  const contacts = database.contacts
    .getContacts()
    .filter((c) => c.user === database.currentUser.getCurrentUser().name)
    .map((c) => {
      return { id: c.id, contact: c.contact };
    });

  return JSON.stringify({
    status: "success",
    message: "Successfully retrieved contacts",
    data: JSON.stringify(contacts),
  });
}

function getContactByName(name) {
  if (!database.currentUser.getCurrentUser()) {
    return JSON.stringify({
      status: "error",
      message: "Unauthorized",
      data: null,
    });
  }

  const contact = database.contacts
    .getContacts()
    .find(
      (c) =>
        c.user === database.currentUser.getCurrentUser().name && c.name === name
    );

  return JSON.stringify({
    status: "success",
    message: "Successfully retrieved contact by name",
    data: JSON.stringify(contact),
  });
}

function postContact(contact) {
  if (!database.currentUser.getCurrentUser()) {
    return JSON.stringify({
      status: "error",
      message: "Unauthorized",
      data: null,
    });
  }
  contact = JSON.parse(contact);
  // Generate a unique ID for the new contact
  const res = database.contacts.postContact(
    contact,
    database.currentUser.getCurrentUser().name
  );
  if (!res) {
    return JSON.stringify({
      status: "error",
      message: "Failed to add contact",
      data: null,
    });
  }

  return JSON.stringify({
    status: "success",
    message: "Successfully added contact",
    data: JSON.stringify(contact),
  });
}

function putContact(id, updatedContact) {
  const res = database.contacts.putContact(
    id,
    JSON.parse(updatedContact),
    database.currentUser.getCurrentUser().name
  );
  if (!res) {
    return JSON.stringify({
      status: "error",
      message: "Failed to update contact",
      data: null,
    });
  }
  return JSON.stringify({
    status: "success",
    message: "Successfully updated contact",
    data: JSON.stringify(updatedContact),
  });
}

function deleteContact(id) {
  const res = database.contacts.deleteContact(id);
  if (!res) {
    return JSON.stringify({
      status: "error",
      message: "Failed to delete contact",
    });
  }
  return JSON.stringify({
    status: "success",
    message: "Successfully deleted contact",
  });
}

// console.log("contactsRoutes.js loaded!");

export {
  deleteContact,
  getContactByName,
  getContacts,
  postContact,
  putContact,
};
