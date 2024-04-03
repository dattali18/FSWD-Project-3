// this will be the file for the class Fajax that will simulate the AJAX requests from the server (simulated in the server directory)

class Fajax {
  constructor() {
    this.method = null;
    this.url = null;
    this.data = null;
    this.message = null;
    this.onload = null;
    this.status = null;
    this.response = null;
  }

  open(method, url) {
    this.method = method;
    this.url = url;
  }

  send(data) {
    this.data = data;
    // Simulate server request
    import("./server.js")
      .then((serverModule) => {
        const server = serverModule.default;
        const { pathname } = new URL(this.url, "http://mycontacts.com");
        const [, resource, action] = pathname.split("/");
        const response = null;

        switch (resource) {
          case "contacts":
            switch (action) {
              case "":
                if (this.method === "GET") {
                  response = server.getAllContacts();
                } else if (this.method === "POST") {
                  const response = server.addContact(this.data);
                }

                // parse the response
                if (response.status == "error") {
                  this.status = 401;
                  this.message = response.message;
                  this.response = null;
                } else {
                  this.status = 200;
                  this.response = response.data;
                  this.message = response.message;
                }
                break;
              case undefined:
                // Handle error
                break;
              default:
                // action is not null
                if (this.method === "GET") {
                  response = server.getContactByName(action);
                } else if (this.method === "POST") {
                  response = server.addContact(action);
                } else if (this.method === "PUT") {
                  response = server.updateContact(action);
                } else if (this.method === "DELETE") {
                  response = server.deleteContact(action);
                }

                // parse the response
                if (response.status === "error") {
                  this.status = 401;
                  this.message = response.message;
                  this.response = null;
                } else {
                  this.status = 200;
                  this.response = response.data;
                  this.message = response.message;
                }
                break;
            }
            break;
          case "users":
            switch (action) {
              case "":
                if (this.method === "POST") {
                  response = server.registerUser(this.data);
                }

                // parse the response
                if (response.status === "error") {
                  this.status = 401;
                  this.message = response.message;
                  this.response = null;
                } else {
                  this.status = 200;
                  this.response = response.data;
                  this.message = response.message;
                }
                break;
              default:
                // Handle error
                break;
            }
            break;
          case "auth":
            if (this.method === "GET") {
              response = server.getCurrentUser();
            }
            if (this.method == "POST") {
              response = server.authenticateUser(
                data.name,
                data.email,
                data.password
              );
            }
            if (this.method == "DELETE") {
              response = server.logoutUser();
            }

            // parse the response
            if (response.status === "error") {
              this.status = 401;
              this.message = response.message;
              this.response = null;
            } else {
              this.status = 200;
              this.response = response.data;
              this.message = response.message;
            }
          default:
            // Handle error
            break;
        }

        if (this.onload) {
          this.onload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
