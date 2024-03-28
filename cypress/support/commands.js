const URL = "http://localhost:5500";
let token = "";
Cypress.Commands.add("resetDbTest", () => {
  cy.log("resetando database");
  cy.request("POST", `${URL}/shelfie/reset`);
});
Cypress.Commands.add("createUser", (user) => {
  cy.request("POST", `${URL}/signUp`, user).then((res) => {
    cy.log(res);
  });
});

Cypress.Commands.add("createUserAndLogin", (user) => {
  cy.request("POST", `${URL}/signUp`, user).then(() => {
    cy.request("POST", `${URL}/signIn`, {
      email: user.email,
      password: user.password,
    }).then((res) => {
      cy.log("response", res.body);
      const stringifyUser = JSON.stringify({
        name: res.body.userName,
        image: res.body.image,
      });
      token = res.body.token;
      window.localStorage.setItem("token", res.body.token);
      window.localStorage.setItem("user", stringifyUser);
    });
  });
});

Cypress.Commands.add("addBookInShelf", (book) => {
  cy.request({
    method: "POST",
    url: `${URL}/shelf`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: book,
  }).then((res) => {
    cy.log(res);
  });
});
