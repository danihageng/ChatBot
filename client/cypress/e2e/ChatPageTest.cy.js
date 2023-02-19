describe("Check the chatPage.", () => {
  it("Check the input sendMessage. ", () => {
    cy.visit("/login");

    // fill in the form
    cy.get("input[name=username]").type("admin");
    cy.get("input[name=password]").type("admin");

    // submit the form
    cy.get("button").contains("Sign in").click();
    cy.get(".logoutButton").should("be.visible");

    // fill in the form
    cy.get("#createMessage").type("hello.");

    cy.get("#messageInput").click();

    // UI should reflect this user being logged in
    cy.get("h4").should("contain", "IA Bot Chat");
  });

  it("Check all the elements on the page is present. ", () => {
    cy.visit("/login");

    // fill in the form
    cy.get("input[name=username]").type("admin");
    cy.get("input[name=password]").type("admin");

    // submit the form
    cy.get("button").contains("Sign in").click();
    cy.get(".logoutButton").should("be.visible");
    // cy.visit("/chat");

    cy.get("#createMessage");

    // UI should reflect this user being logged in
    cy.get("#chatContainer");
    cy.get("h4").should("contain", "IA Bot Chat");
    cy.get(".chatBody");
    cy.get("form");
  });
});

describe("Check LogOut Button.", () => {
  it("Check LogOut Button", () => {
    cy.visit("/login");

    // fill in the form
    cy.get("input[name=username]").type("admin");
    cy.get("input[name=password]").type("admin");

    // submit the form
    cy.get("button").contains("Sign in").click();
    cy.get(".logoutButton").should("be.visible");
  });

  it("Check if the button LogOut is disabled when click on logout", () => {
    cy.visit("/login");

    // fill in the form
    cy.get("input[name=username]").type("admin");
    cy.get("input[name=password]").type("admin");

    // submit the form
    cy.get("button").contains("Sign in").click();

    cy.get(".logoutButton").should("be.visible");
    cy.get(".logoutButton").click();

    cy.visit("/login");
    cy.get("h2").should("contain", "Login");
    cy.get(".logoutButton").should("not.exist");
  });
});
