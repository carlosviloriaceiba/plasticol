import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { SolicitudesPage } from '../page/solicitudes/solicitudes.po';
import * as moment from 'moment';


describe('Pantalla Home / Solicitudes', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let solicitudes: SolicitudesPage;
    let nextDay: string;

    beforeEach(() => {

        nextDay = moment().startOf('isoWeek').add(1, 'week').day('monday').format('YYYY-MM-DD');
        page = new AppPage();
        navBar = new NavbarPage();
        solicitudes = new SolicitudesPage();
        browser.waitForAngularEnabled(false);

    });

    it('Deberia ingresar lista solicitudes', async () => {
        await page.navigateTo();
        await solicitudes.clickHomeSolicitudes();
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toContain('/solicitud/listar');
    });

    it('Deberia mostrar sumario resumen', async () => {

        browser.sleep(2000);
        expect(solicitudes.listaResumenConteo()).toBe(3);
    });

    it('Deberia mostrar listado en tabla', async () => {

        expect(solicitudes.existeTabla()).toBe(true);
    });

    it('Deberia registrar solicitud', async () => {
        await navBar.clickLinkSolicitudes();
        browser.sleep(1000);
        const inicialElementos = await solicitudes.countElementosTabla();
        await solicitudes.clickLinkCrearSolicitud();
        browser.sleep(2000);
        const form = {
            day: nextDay,
            productosSelectInput: 'PET',
            materialCountInput: '200.754',
            materialUnitInput: 'Ton',
            cityInput: 'Barranquilla',
            addressInput: 'Carrera 30 #39 b sur',
            contactPersonInput: 'Patricia Teran',
            contactNumberInput: '3000001010'
        };

        await solicitudes.escribirSolicitud(form);
        await solicitudes.clickButtonRegistroSolictud();
        browser.sleep(2000);
        const finalElementos = await solicitudes.countElementosTabla();
        expect(inicialElementos).toBeLessThan(finalElementos);

    });

    it('Deberia cancelar solicitud', async () => {
        await navBar.clickLinkSolicitudes();
        browser.sleep(1000);
        await solicitudes.clickLinkCrearSolicitud();
        browser.sleep(2000);
        const form = {
            day: nextDay,
            productosSelectInput: 'PET',
            materialCountInput: '200.854',
            materialUnitInput: 'Ton',
            cityInput: 'Cartagena',
            addressInput: 'Carrera 30 #39 b sur',
            contactPersonInput: 'Patricia Teran',
            contactNumberInput: '3000001010'
        };

        await solicitudes.escribirSolicitud(form);
        await solicitudes.clickButtonRegistroSolictud();
        browser.sleep(2000);
        await solicitudes.clickSolicitudesButtonCancelar();
        await solicitudes.existeConfirmButtonSwalConfirm();
        await solicitudes.clickConfirmButtonSwalConfirm();
        browser.sleep(1000);
        const confirmacion = await solicitudes.tittleSwalConfirmButtonSwalConfirm();
        await solicitudes.clickConfirmButtonSwalConfirm();

        expect(confirmacion).toEqual('Cancelada!');
    });

    it('Deberia eliminar solicitud', async () => {
        await navBar.clickLinkSolicitudes();
        browser.sleep(1000);
        await solicitudes.clickLinkCrearSolicitud();
        browser.sleep(2000);
        const form = {
            day: nextDay,
            productosSelectInput: 'PET',
            materialCountInput: '250.854',
            materialUnitInput: 'Ton',
            cityInput: 'Valledeupar',
            addressInput: 'Carrera 30 #39 b sur',
            contactPersonInput: 'Patricia Teran',
            contactNumberInput: '3000001010'
        };

        await solicitudes.escribirSolicitud(form);
        await solicitudes.clickButtonRegistroSolictud();
        browser.sleep(2000);
        await solicitudes.clickSolicitudesButtonEliminar();
        await solicitudes.existeConfirmButtonSwalConfirm();
        await solicitudes.clickConfirmButtonSwalConfirm();
        browser.sleep(1000);
        const confirmacion = await solicitudes.tittleSwalConfirmButtonSwalConfirm();
        await solicitudes.clickConfirmButtonSwalConfirm();
        expect(confirmacion).toEqual('Borrado!');
    });

});
