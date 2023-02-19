// Documentation about cypress and how it works.
// https://docs.cypress.io/api/introduction/api.html

describe("Check all the input login Page.", () => {
  it("Check input username.", () => {
    // destructuring assignment of the this.currentUser object
    const { username } = { username: "asd" };

    // check if we are in loginPage
    cy.visit("/login");

    cy.get("h2").should("contain", "Login");

    // fill in the form
    cy.get("input[name=username]").type(username);
    expect(username).to.equal("asd");
  });

  it("Check input password.", () => {
    // destructuring assignment of the this.currentUser object
    const { password } = { password: "asd" };

    cy.visit("/login");

    // fill in the form
    cy.get("input[name=password]").type(password);
    expect(password).to.equal("asd");
  });

  it("Check if dont input, we can not see the chat page.", () => {
    cy.visit("/login");

    // submit the form
    cy.get("button").contains("Sign in").click();

    cy.get(".logoutButton").should("not.exist");
  });

  it("Check if only input a username, we can not see the chat page.", () => {
    cy.visit("/login");

    // fill in the form
    cy.get("input[name=username]").type("test@test.com");
    // submit the form
    cy.get("button").contains("Sign in").click();

    cy.get(".logoutButton").should("not.exist");
  });

  it("Check if only input a password, we can not see the chat page.", () => {
    cy.visit("/login");

    // fill in the form
    cy.get("input[name=password]").type("test1234");
    // submit the form
    cy.get("button").contains("Sign in").click();

    cy.get(".logoutButton").should("not.exist");
  });
});

describe("Check the Api URL", () => {
  it("Login URL Post", () => {
    // destructuring assignment of the this.currentUser object
    const { username, password } = { username: "asd", password: "asd" };

    cy.visit("/login");

    // fill in the form
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);

    // submit the form
    cy.get("button").contains("Sign in").click();

    // make the request
    cy.request("POST", "http://localhost:8000/login", { username, password });

    // check if the logoutButton is visible
    cy.get(".logoutButton").should("be.visible");

    // return to the loginPage
    cy.get(".logoutButton").click();
  });
});
