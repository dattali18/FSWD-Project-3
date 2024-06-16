const links = {
  "#login": loginLink,
  "#signup": signupLink,
  "#home": homeLink,
};

export function renderPage(pageId) {
  const pages = ["#login", "#signup", "#home", "#contact-form-page"];
  pages.forEach((page) => {
    const pageElement = document.querySelector(page);

    if (page === pageId) {
      pageElement.style.display = "block";
    } else {
      pageElement.style.display = "none";
    }
  });
}

export function activateLink(linkId) {
  for (let link in links) {
    if (link === linkId) {
      links[link].classList.add("active");
    } else {
      links[link].classList.remove("active");
    }
  }
}
