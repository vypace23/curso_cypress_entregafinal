export class OnlineShopShoppingCart {

  constructor() {

    this.productoName = '#productName';
    this.productoPrecio = '#productPrice';

  }

  validarProducto(productofixtureparam) {
    cy.xpath(`//p[text()="${productofixtureparam}"]`).should('have.text', productofixtureparam)

  }

  validarPrecio(productofixtureparam, preciofixtureparam) {

    cy.xpath(`//p[text()="${productofixtureparam}"]`).siblings(this.productoPrecio).should('have.text', "$" + preciofixtureparam);

  }

}

