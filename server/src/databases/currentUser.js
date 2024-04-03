function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function postCurrentUser(data) {
    localStorage.setItem('currentUser', JSON.stringify(data));
}