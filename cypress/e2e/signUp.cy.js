/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";

describe("sign-up test", () => {
  beforeEach(() => {
    cy.resetDbTest();
  });
  it("Should sign-up", () => {
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

    cy.visit(`${URL}/signUp`);
    cy.get('[placeholder="nome"]').type(user.name);
    cy.get('[placeholder="Imagem ex: https://i.pinimg.com/..."]').type(
      user.image
    );
    cy.get('[placeholder="e-mail"]').type(user.email);
    cy.get('[placeholder="senha"]').type(user.password);
    cy.get('[placeholder="repita a senha"]').type(user.password);
    cy.intercept("POST", "/signUp").as("signUp");
    cy.contains("Enviar").click();
    cy.wait("@signUp");

    cy.url().should("equal", `${URL}/`);
  });
});
