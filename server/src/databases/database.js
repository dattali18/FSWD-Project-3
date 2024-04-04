import { contacts } from "./contacts.js";
import { currentUser } from "./currentUser.js";
import { users } from "./users.js";

const database = {
  users,
  contacts,
  currentUser,
};

// console.log("database.js loaded!");

export default database;

// window.database = database;
