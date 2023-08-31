/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { LoginPage } from "../support/pages/loginPage";
import { OnlineShopProducts } from "../support/pages/onlineshopProducts";
import { OnlineShopShoppingCart } from "../support/pages/onlineshopShoppingCart";




describe("Validar Productos", () =>{
    let datosProductos
    let datosLogin
    const loginPage = new LoginPage ();
    const homePage = new HomePage ();
    const onlineShopProducts = new OnlineShopProducts ();
    const onlineshopShoppingCart = new OnlineShopShoppingCart ();

    before('Before', () =>{

        cy.fixture('datosProducto').then(data => {

            datosProductos=data;

        })

        cy.fixture('datosLogin').then(data => {

            datosLogin=data;

        })

    });

    
    beforeEach('BeforeEach', () =>{
        cy.visit('');
        cy.get("#registertoggle").dblclick();
        //Ingresar en la pagina de pushing IT.
        //Ingresar al sistema con datos validos.
        loginPage.escribirUsuario(datosLogin.username);
        loginPage.escribirPass(datosLogin.password);
        loginPage.clickLogin();
        //Dirigirse al modulo "Online Shop".
        homePage.clickonlineShopButton()
     
    });

    
   it("Agregar productos al carrito", () =>{

    let producto1;
    producto1 =datosProductos.producto1
    let productoprecio1;
    productoprecio1 =datosProductos.productoprecio1
    let producto2;
    producto2=datosProductos.producto2
    let productoprecio2;
    productoprecio2 =datosProductos.productoprecio2
    let total;
    total= datosProductos.productoprecio1 + datosProductos.productoprecio2

    //Elegir 2 productos a elección y añadirlos al carrito.
    onlineShopProducts.clickAddProducto(producto1);
    onlineShopProducts.clickCloseModal();
    onlineShopProducts.clickAddProducto(producto2);
    onlineShopProducts.clickCloseModal();
    onlineShopProducts.clickGoShoppingCart()

    //Verificar el nombre y precio de los dos productos.
    onlineshopShoppingCart.validarProducto(producto1);
    onlineshopShoppingCart.validarProducto(producto2);
    onlineshopShoppingCart.validarPrecio(producto1, productoprecio1);
    onlineshopShoppingCart.validarPrecio(producto2, productoprecio2);

    //Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos
    cy.get('[type="button"]').contains("Show total price").click();
    cy.get('[id="price"]').should ('have.text', total);
    




    });



    
});