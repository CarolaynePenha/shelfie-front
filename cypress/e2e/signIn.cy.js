/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";

describe("sign-in test", () => {
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
  beforeEach(() => {
    cy.resetDbTest();
    cy.createUser(user);
  });

  it("Should sign-in", () => {
    cy.visit(`${URL}/`);
    cy.get('[placeholder="e-mail"]').type(user.email);
    cy.get('[placeholder="senha"]').type(user.password);
    cy.intercept("POST", "/signIn").as("signIn");
    cy.contains("Entrar").click();
    cy.wait("@signIn");

    cy.url().should("equal", `${URL}/shelf`);
  });
});
