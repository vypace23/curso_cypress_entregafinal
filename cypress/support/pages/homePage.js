export class HomePage {

    constructor() {

        this.toDoListButton = '#todolistlink';
        this.onlineShopButton = '#onlineshoplink'
    }
    clickToDoListButton() {
        cy.get(this.toDoListButton).click();
    }

    clickonlineShopButton() {
        cy.get(this.onlineShopButton).click();
    }



}