/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";

describe("shelf test", () => {
  const fakeCapitalLetter = faker.internet.password({
    pattern: /(?=.*[A-Z])/,
    length: 2,
  });
  const fakeLowerCase = faker.internet.password({
    pattern: /(?=.*[a-z])/,
    length: 5,
  });
  const fakeDigs = faker.internet.password({
    pattern: /(?=.*\d)/,
    length: 2,
  });
  const fakeChars = faker.internet.password({
    pattern: /(?=.*[@$!%*?&])/,
    length: 5,
  });
  const user = {
    name: faker.word.noun(),
    email: faker.internet.email(),
    password: fakeCapitalLetter + fakeLowerCase + fakeDigs + fakeChars,
    image: faker.image.url(),
  };
  const book1 = {
    bookId: 1,
    iHave: false,
    type: "paper",
    status: "reading",
  };
  const book2 = {
    bookId: 2,
    iHave: true,
    type: "paper",
    status: "done",
  };
  beforeEach(() => {
    cy.resetDbTest();
    cy.createUserAndLogin(user);
    cy.addBookInShelf(book1);
    cy.addBookInShelf(book2);
  });

  it("Should open book", () => {
    cy.visit(`${URL}/shelf`);
    cy.wait(2000);
    cy.get(".shelf img").first().click();
    cy.url().should("equal", `${URL}/bookInfos/${book1.bookId}`);
  });
});
