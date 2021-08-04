import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { LoginPage } from '../page/login/login.po';


describe('Pantalla Parqueo Resumen', () => {
    let page: AppPage;

    let login: LoginPage;

    beforeEach(() => {
        page = new AppPage();    
        login = new LoginPage();
        browser.waitForAngularEnabled(false);
    });

    it('Deberia mostrar trm', async () => {
        await page.navigateTo();
      
        browser.sleep(2000);
        
        expect(login.tieneTrm()).toBe(true);
    });

    it('Deberia hacer login', async () => {

        await login.escribirUsuario('admin@sofyplastic.com');
        await login.escribirPassword('user1');
        await login.clickLogin();
        
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toContain("/home");
    });

    it('Deberia hacer logout', async () => {
        await login.clickLogoutButtonMenu();        
        browser.sleep(500);
        await login.clickLogoutButtonAction();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain("/login");
    });

});
