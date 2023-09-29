/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { LoginPage } from "../support/pages/loginPage";
import { OnlineShopProducts } from "../support/pages/onlineshopProducts";
import { OnlineShopShoppingCart } from "../support/pages/onlineshopShoppingCart";
import { OnlineShopCheckOut } from "../support/pages/onlineshopShoppingCheckOut";


describe("Validar Productos", () => {
    let datosProductos
    let datosLogin
    let datosCheckout
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const onlineShopProducts = new OnlineShopProducts();
    const onlineshopShoppingCart = new OnlineShopShoppingCart();
    const onlineshopShoppingCheckOut = new OnlineShopCheckOut();
    let username;

    before('Before', () => {

        cy.fixture('datosProducto').then(data => {

            datosProductos = data;

        })


        cy.fixture('datosCheckout').then(data => {

            datosCheckout = data;

        })

    });


    beforeEach('BeforeEach', () => {


        username = 'usuario' + Math.floor(Math.random() * 1000)
        const password = '123456!'
        const gender = "Male"
        const day = '10'
        const month = 'October'
        const year = "1980"

        cy.request({
            url: "https://pushing-it.onrender.com/api/register",
            method: "POST",
            body: {
                "username": username,
                "password": password,
                "gender": gender,
                "day": day,
                "month": month,
                "year": year
            }
        }).then(respuesta => {
            window.localStorage.setItem('token', respuesta.body.token)
            expect(respuesta.status).to.be.equal(200);
            expect(respuesta.body.newUser.username).to.be.equal(username);
            expect(respuesta.body.newUser.gender).to.be.equal(gender);
            expect(respuesta.body.newUser.day).to.be.equal(day);
            expect(respuesta.body.newUser.month).to.be.equal(month);
            expect(respuesta.body.newUser.year).to.be.equal(year);
            cy.log(JSON.stringify(respuesta.body.newUser))

        })


        cy.request({
            url: "https://pushing-it.onrender.com/api/login",
            method: "POST",
            body: {
                "username": username,
                "password": password
            }
        }).then(respuesta => {
            cy.log(respuesta.body)
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.user.username)
        })
        cy.visit('')

        homePage.clickonlineShopButton()

    });


    it("Agregar productos al carrito", () => {

        let producto1;
        producto1 = datosProductos.producto1
        let productoprecio1;
        productoprecio1 = datosProductos.productoprecio1
        let producto2;
        producto2 = datosProductos.producto2
        let productoprecio2;
        productoprecio2 = datosProductos.productoprecio2
        let total;
        total = datosProductos.productoprecio1 + datosProductos.productoprecio2
        let firstname = datosCheckout.firstname;
        let lastname = datosCheckout.lastname;
        let card = datosCheckout.card;
        onlineShopProducts.clickAddProducto(producto1);
        onlineShopProducts.clickCloseModal();
        onlineShopProducts.clickAddProducto(producto2);
        onlineShopProducts.clickCloseModal();
        onlineShopProducts.clickGoShoppingCart()
        onlineshopShoppingCart.validarProducto(producto1);
        onlineshopShoppingCart.validarProducto(producto2);
        onlineshopShoppingCart.validarPrecio(producto1, productoprecio1);
        onlineshopShoppingCart.validarPrecio(producto2, productoprecio2);
        cy.get('[type="button"]').contains("Show total price").click();
        cy.get('[id="price"]').should('have.text', total);
        cy.get('[type="button"]').contains("Go to Checkout").click();
        onlineshopShoppingCheckOut.escribirFirstName(firstname);
        onlineshopShoppingCheckOut.escribirLastName(lastname);
        onlineshopShoppingCheckOut.escribircardNumber(card)
        cy.get('[type="submit"]').contains("Purchase").click();
        onlineshopShoppingCheckOut.validarCard(card);
        onlineshopShoppingCheckOut.validarProducto(producto1);
        onlineshopShoppingCheckOut.validarProducto(producto2);
        onlineshopShoppingCheckOut.validarName(firstname, lastname);
        onlineshopShoppingCheckOut.validarTotal(total)

    });


    afterEach('After each', () => {

        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
            method: "DELETE",
            failOnStatusCode: false
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
        })


    })




});