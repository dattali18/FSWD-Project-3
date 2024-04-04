function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  // if (user === "") {
  //   return null;
  // }
  return JSON.parse(user);
}

function postCurrentUser(data) {
  localStorage.setItem("currentUser", JSON.stringify(data));
}

function logoutUser() {
  // localStorage.setItem("currentUser", null);
  localStorage.removeItem("currentUser");
}

const currentUser = {
  getCurrentUser,
  postCurrentUser,
  logoutUser,
};

export { currentUser };
