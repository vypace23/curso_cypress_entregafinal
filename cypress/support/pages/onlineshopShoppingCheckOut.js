export class OnlineShopCheckOut {

  constructor() {

    this.firstName = '#FirstName';
    this.lastName = '#lastName';
    this.cardNumber = '#cardNumber'
    this.ticketname = "#name",
    this.ticketproduct1 = "#Black T-Shirt",
    this.ticketproduct2 = "#White Pants",
    this.ticketcard = "#creditCard",
    this.ticketprice = "#totalprice"
  }

  escribirFirstName(firstNameparam) {
    cy.get(this.firstName).type(firstNameparam);
  }

  escribirLastName(lastNameparam) {
    cy.get(this.lastName).type(lastNameparam);
  }

  escribircardNumber(cardNumberparam) {
    cy.get(this.cardNumber).type(cardNumberparam);
  }

  validarProducto(producto) {
    cy.xpath(`//p[text()="${producto}"]`).should('have.text', producto)
  }

  validarName(name, lastName) {
    cy.get('#name').should('have.text', name + " " + lastName + " " + "has succesfully purchased the following items")
  }

  validarCard(card) {
    cy.xpath(`//p[text()="${card}"]`).should('have.text', card)
  }

  validarTotal(total) {
    cy.get('#totalPrice').should('have.text', "You have spent $" + total)
  }

}

