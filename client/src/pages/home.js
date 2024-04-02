// this page will handle the logic of the home page in our application

export function renderHomePage() {
  const contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";
  // dummy data for the contact list
  const contacts = [
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+999-999-9999",
    },
    {
      name: "Mary Jane",
      email: "maryjane@gmail.com",
      phone: "+888-888-8888",
    },
    {
      name: "Peter Parker",
      email: "paterparker@gmail.com",
      phone: "+777-777-7777",
    },
  ];

  // loop through the contacts array and create a list item for each contact
  contacts.forEach((contact) => {
    const listItem = document.createElement("li");
    listItem.classList.add("contact");

    const avatar = document.createElement("img");
    avatar.src = "../../client/public/assets/images/user-icon.png";
    avatar.alt = "Avatar";
    avatar.classList.add("avatar");
    listItem.appendChild(avatar);

    const contactInfo = document.createElement("div");
    contactInfo.classList.add("contact-info");
    listItem.appendChild(contactInfo);

    const contactName = document.createElement("h3");
    contactName.classList.add("contact-name");
    contactName.textContent = contact.name;
    contactInfo.appendChild(contactName);

    const contactPhone = document.createElement("p");
    contactPhone.classList.add("contact-phone");
    contactPhone.textContent = contact.phone;
    contactInfo.appendChild(contactPhone);

    const contactEmail = document.createElement("p");
    contactEmail.classList.add("contact-email");
    contactEmail.textContent = contact.email;
    contactInfo.appendChild(contactEmail);

    // Add more contact details here

    contactList.appendChild(listItem);
  });
}
