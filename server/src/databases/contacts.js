// this will simulate a database for contacts using the localStorage
const DB_NAME = "contacts";

function getContacts() {
  return JSON.parse(localStorage.getItem(DB_NAME)) || [];
}

function postContact(contact, userId) {
  let data = {
    id: getContacts().length + 1,
    contact: contact,
    user: userId,
  };

  let contacts = getContacts();
  contacts.push(data);
  localStorage.setItem(DB_NAME, JSON.stringify(contacts));
  return true;
}

function putContact(id, contact, userId) {
  let data = {
    contact: contact,
    user: userId,
    id: id,
  };

  let contacts = getContacts();
  let index = contacts.findIndex((c) => c.id == id);
  // console.log(index);
  if (index == -1) {
    return false;
  }
  contacts[index] = data;
  localStorage.setItem(DB_NAME, JSON.stringify(contacts));

  return true;
}

function deleteContact(id) {
  let contacts = getContacts();
  let index = contacts.findIndex((c) => c.id === id);
  if (index == -1) {
    return false;
  }
  contacts.splice(index, 1);
  localStorage.setItem(DB_NAME, JSON.stringify(contacts));

  return true;
}

const contacts = {
  getContacts,
  postContact,
  putContact,
  deleteContact,
};

export { contacts };
