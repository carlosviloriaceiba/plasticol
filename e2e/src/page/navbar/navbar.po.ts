import { by, element } from 'protractor';

export class NavbarPage {

    linkHome = element(by.id('homeLink'));
    linkSolicitudes = element(by.id('solicitudesLink'));


    async clickLinkHome() {
        await this.linkHome.click();
    }

    async clickLinkSolicitudes() {
        await this.linkSolicitudes.click();
    }


}
