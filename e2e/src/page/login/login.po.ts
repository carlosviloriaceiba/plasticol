import { by, element } from 'protractor';

export class LoginPage {

    private trm = element(by.css('.trm-element'));
    private usuarioInput = element(by.id('user-input'));
    private passwordInput = element(by.id('password'));
    private loginButton = element(by.id('login-btn'));
    private logoutButtonMenu = element(by.id('navbarDropdownMenuLink'));
    private logoutButtonAction = element(by.id('logoutMenuLink'));

    async tieneTrm() {
        return this.trm.isPresent();
    }

    async escribirUsuario(usuario) {
        await this.usuarioInput.clear();
        await this.usuarioInput.sendKeys(usuario);
    }

    async escribirPassword(password) {
        await this.passwordInput.clear();
        await this.passwordInput.sendKeys(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
    async clickLogoutButtonMenu() {
        await this.logoutButtonMenu.click();
    }
    async clickLogoutButtonAction() {
        await this.logoutButtonAction.click();
    }
}
