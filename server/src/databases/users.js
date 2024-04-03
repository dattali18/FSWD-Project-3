// this will simulate a database using the localStorage
const DB_NAME = "users";

function getUsers() {
  return JSON.parse(localStorage.getItem(DB_NAME)) || [];
}

function getUser(name) {
  return getUsers().find((u) => u.name === name);
}

function postUser(name, email, password) {
  let data = {
    name: name,
    email: email,
    password: password,
  };
  let users = getUsers();
  users.push(data);
  localStorage.setItem(DB_NAME, JSON.stringify(users));
}

function putUser(user, name) {
  let users = getUsers();
  let index = users.findIndex((u) => u.name === name);
  users[index] = user;
  localStorage.setItem(DB_NAME, JSON.stringify(users));
}

function deleteUser(name) {
  let users = getUsers();
  let index = users.findIndex((u) => u.name === name);
  users.splice(index, 1);
  localStorage.setItem(DB_NAME, JSON.stringify(users));
}

const users = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};


export { users };
