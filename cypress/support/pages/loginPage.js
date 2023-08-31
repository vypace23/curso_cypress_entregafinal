export class LoginPage {

    constructor (){
    this.userInput = '#user';
    this.userPass = '#pass';
    this.loginButton = '#submitForm';

    }

    escribirUsuario(usuario){

        cy.get(this.userInput).type (usuario);
    }


    escribirPass(contrasenia){

        cy.get(this.userPass).type (contrasenia);
    }

    clickLogin(){

        cy.get(this.loginButton).click();
    }



}