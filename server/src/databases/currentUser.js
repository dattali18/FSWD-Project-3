function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function postCurrentUser(data) {
  localStorage.setItem("currentUser", JSON.stringify(data));
}

function logoutUser() {
  localStorage.removeItem("currentUser");
}

const currentUser = {
  getCurrentUser,
  postCurrentUser,
  logoutUser,
};


export { currentUser };
