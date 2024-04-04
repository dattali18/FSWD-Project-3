// this page will handle the logic of the home page in our application
import { renderContactFormPage } from "./contactForm.js";

import { renderPage } from "../utils/navigation.js";
import Fajax from "../utils/fajax.js";

function getInitials(name) {
  const words = name.split(" ");
  let initials = "";
  if (words.length === 1) {
    initials = words[0].charAt(0).toUpperCase();
  } else if (words.length === 2) {
    words.forEach((word) => {
      initials += word.charAt(0).toUpperCase();
    });
  } else {
    initials =
      words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }
  return initials;
}

function handleTrashClick(id) {
  console.log("Trash clicked!");

  // client-side code
  // TODO: send a DELETE request to the server
  const url = "/contacts/" + id;
  console.log(url);
  const request = new Fajax();
  request.open("DELETE", url);
  request.onload = () => {
    if (request.status === 200) {
      console.log("Success:", request.message);
    } else {
      console.error("Error:", request.message);
    }
  };
  request.send();

  // render the home page
  renderHomePage();
  renderPage("#home");
}

function handleEditClick(contact) {
  console.log("Edit clicked!");

  // opening the contact form page
  renderContactFormPage(contact);
  renderPage("#contact-form-page");
}

const colorList = ["purple", "blue", "green", "yellow", "orange", "red"];

function createListItem(contactList, object) {
  const contact = object.contact;
  const listItem = document.createElement("li");
  listItem.classList.add("contact");

  let randomIndex = Math.floor(Math.random() * colorList.length);
  let randomElement = colorList[randomIndex];

  const contactAvatar = document.createElement("div");
  contactAvatar.classList.add("contact-avatar", randomElement + "-avatar");
  contactAvatar.textContent = getInitials(contact.name);
  listItem.appendChild(contactAvatar);

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

  const contactEmail = document.createElement("p");
  contactEmail.classList.add("contact-email");
  contactEmail.textContent = contact.email;
  contactDetails.appendChild(contactEmail);

  const contactPhone = document.createElement("p");
  contactPhone.classList.add("contact-phone");
  contactPhone.textContent = contact.phone;
  contactDetails.appendChild(contactPhone);

  const contactOption = document.createElement("div");
  contactOption.classList.add("contact-option");
  listItem.appendChild(contactOption);

  const contactEdit = document.createElement("div");
  contactEdit.classList.add("contact-edit");
  contactOption.appendChild(contactEdit);

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-edit", "edit-icon");
  contactEdit.appendChild(editIcon);

  const editText = document.createElement("p");
  editText.textContent = "Edit";
  contactEdit.appendChild(editText);

  const contactTrash = document.createElement("div");
  contactTrash.classList.add("contact-trash");
  contactOption.appendChild(contactTrash);

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash", "trash-icon");
  contactTrash.appendChild(trashIcon);

  const deleteText = document.createElement("p");
  deleteText.textContent = "Delete";
  contactTrash.appendChild(deleteText);

  contactEdit.addEventListener("click", handleEditClick.bind(null, object));
  contactTrash.addEventListener(
    "click",
    handleTrashClick.bind(null, object.id)
  );

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
  contacts.forEach((object) => {
    createListItem(contactList, object);
  });
}

console.log("home.js loaded!");
