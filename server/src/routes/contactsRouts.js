import database from "../databases/database.js";

// const database = window.database;

function getAllContacts() {
  if (!database.currentUser.getCurrentUser()) {
    return { status: "error", message: "Unauthorized", data: null };
  }

  return {
    status: "success",
    message: "Successfully retrieved contacts",
    data: database.contacts
      .getContacts()
      .filter((c) => c.user === database.currentUser.getCurrentUser().name)
      .map((c) => {
        return { id: c.id, contact: c.contact };
      }),
  };
}

function getContactByName(name) {
  if (!database.currentUser.getCurrentUser()) {
    return { status: "error", message: "Unauthorized", data: null };
  }

  const contact = database.contacts
    .getContacts()
    .find(
      (c) =>
        c.user === database.currentUser.getCurrentUser().name && c.name === name
    );

  return {
    status: "success",
    message: "Successfully retrieved contact by name",
    data: contact,
  };
}

function addContact(contact) {
  if (!database.currentUser.getCurrentUser()) {
    return { status: "error", message: "Unauthorized", data: null };
  }
  contact = JSON.parse(contact);
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
  const res = database.contacts.deleteContact(id);
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

// window.getAllContacts = getAllContacts;
// window.getContactByName = getContactByName;
// window.addContact = addContact;
// window.updateContact = updateContact;
// window.deleteContact = deleteContact;

// console.log("contactsRoutes.js loaded!");

export {
  addContact,
  deleteContact,
  getAllContacts,
  getContactByName,
  updateContact,
};
