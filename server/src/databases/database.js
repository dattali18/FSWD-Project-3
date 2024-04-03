import { currentUser } from "./currentUser.js";
import { contacts } from "./databases/contacts.js";
import { users } from "./databases/users.js";

const database = {
  users,
  contacts,
  currentUser,
};

export default database;
