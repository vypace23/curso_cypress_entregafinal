export class OnlineShopProducts {
    constructor() {

        this.goShoppingCart = '#goShoppingCart';
        this.closeModal = '#closeModal';

    }

    clickGoShoppingCart() {

        cy.get(this.goShoppingCart).click();
    }

    clickAddProducto(producto) {

        cy.xpath(`//p[text()="${producto}"]//following-sibling::button[text()="Add to cart"]`).click();
    }

    clickCloseModal() {
        cy.get(this.closeModal).click()

    }
}
