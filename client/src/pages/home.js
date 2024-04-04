// this page will handle the logic of the home page in our application
import Fajax from "../utils/fajax.js";

function createListItem(contactList, contact) {
  const listItem = document.createElement("li");
  listItem.classList.add("contact");

  const contactImg = document.createElement("div");
  contactImg.classList.add("contact-img");
  listItem.appendChild(contactImg);

  const avatar = document.createElement("img");
  avatar.src = "../../client/public/assets/images/user-icon.png";
  avatar.alt = "Avatar";
  avatar.classList.add("contact-avatar");
  contactImg.appendChild(avatar);

  const contactInfo = document.createElement("div");
  contactInfo.classList.add("contact-info");
  listItem.appendChild(contactInfo);

  const contactName = document.createElement("h3");
  contactName.classList.add("contact-name");
  contactName.textContent = contact.name;
  contactInfo.appendChild(contactName);

  const contactDetails = document.createElement("div");
  contactDetails.classList.add("contact-details");
  contactInfo.appendChild(contactDetails);

  const contactPhone = document.createElement("p");
  contactPhone.classList.add("contact-phone");
  contactPhone.textContent = contact.phone;
  contactDetails.appendChild(contactPhone);

  const contactEmail = document.createElement("p");
  contactEmail.classList.add("contact-email");
  contactEmail.textContent = contact.email;
  contactDetails.appendChild(contactEmail);

  contactList.appendChild(listItem);
}

export function renderHomePage() {
  const contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";

  // client-side code
  let contacts = [];
  // const request = new window.Fajax();
  const request = new Fajax();
  request.open("GET", "/contacts/");
  request.onload = () => {
    if (request.status === 200) {
      contacts = request.response;
      console.log("Success:", request.response);
    } else {
      console.error("Error:", request.response);
    }
  };
  request.send();

  // loop through the contacts array and create a list item for each contact
  contacts.forEach((contact) => {
    createListItem(contactList, contact);
  });
}

console.log("home.js loaded!");
