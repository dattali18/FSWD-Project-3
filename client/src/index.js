// this is the entry point of the application

function navigateTo(pageId) {
  const pages = ["#login", "#signup", "#home"];
  pages.forEach((page) => {
    const pageElement = document.querySelector(page);
    if (page === pageId) {
      pageElement.style.display = "block";
    } else {
      pageElement.style.display = "none";
    }
  });
}

document.getElementById("loginLink").addEventListener("click", () => {
  navigateTo("#login");
});

document.getElementById("signupLink").addEventListener("click", () => {
  navigateTo("#signup");
});

document.getElementById("homeLink").addEventListener("click", () => {
  navigateTo("#home");
});