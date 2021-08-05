import { by, element } from 'protractor';

export class SolicitudesPage {

    private linkHomeSolicitudes = element(by.id('buttonIrSolicitudes'));

    private listaResumen = element.all(by.tagName('circle-progress'));

    private listadoTabla = element(by.id('listadoSolicitudesTabla'));

    private linkListarSolicitud = element(by.id('linkListarSolicitud'));
    private linkCrearSolicitud = element(by.id('linkCrearSolicitud'));

    private inputDayToDispatch = element(by.id('dayToDispatchInput'));


    private productosSelectInput = element(by.id('productosSelectInput'));
    private materialCountInput = element(by.id('materialCountInput'));
    private materialUnitInput = element(by.id('materialUnitInput'));
    private cityInput = element(by.id('cityInput'));
    private addressInput = element(by.id('addressInput'));
    private contactPersonInput = element(by.id('contactPersonInput'));
    private contactNumberInput = element(by.id('contactNumberInput'));
    private buttonRegistroSolictud = element(by.id('buttonRegistroSolictud'));
    private solicitudesButtonCancelar = element.all(by.css('.solicitudesButtonCancelar'));
    private solicitudesButtonEliminar = element.all(by.css('.solicitudesButtonEliminar'));
    private buttonSwalConfirm = element(by.className('swal2-confirm'));
    private tittleSwalConfirm = element(by.id('swal2-title'));

    async clickHomeSolicitudes() {
        await this.linkHomeSolicitudes.click();
    }

    async listaResumenConteo() {
        return this.listaResumen.count();
    }

    async existeTabla(){
        return this.listadoTabla.isPresent();
    }
    async countElementosTabla(){
        return this.listadoTabla.all(by.tagName('tr')).count();
    }
    async clickLinkListarSolicitud() {
        await this.linkListarSolicitud.click();
    }

    async clickLinkCrearSolicitud() {
        await this.linkCrearSolicitud.click();
    }
    async clickInputDayToDispatchInput() {
        await this.inputDayToDispatch.click();
    }

    async escribirSolicitud({
        day,
        productosSelectInput,
        materialCountInput,
        materialUnitInput,
        cityInput,
        addressInput,
        contactPersonInput,
        contactNumberInput
    }) {

        await this.inputDayToDispatch.clear();
        await this.inputDayToDispatch.sendKeys(day);

        await this.productosSelectInput.element(by.cssContainingText('option', productosSelectInput)).click();
        await this.materialCountInput.clear();
        await this.materialCountInput.sendKeys(materialCountInput);

        await this.materialUnitInput.element(by.cssContainingText('option', materialUnitInput)).click();

        await this.cityInput.element(by.cssContainingText('option', cityInput)).click();

        await this.addressInput.clear();
        await this.addressInput.sendKeys(addressInput);
        await this.contactPersonInput.clear();
        await this.contactPersonInput.sendKeys(contactPersonInput);
        await this.contactNumberInput.clear();
        await this.contactNumberInput.sendKeys(contactNumberInput);


    }

    async clickButtonRegistroSolictud(){
       await this.buttonRegistroSolictud.click();
    }

    async clickSolicitudesButtonCancelar(){
      await this.solicitudesButtonCancelar.first().click();

    }
    async clickSolicitudesButtonEliminar(){
        await this.solicitudesButtonEliminar.first().click();
    }

    async existeConfirmButtonSwalConfirm(){
        await this.buttonSwalConfirm.isPresent();
    }

    async clickConfirmButtonSwalConfirm(){
        await this.buttonSwalConfirm.click();
    }
    async tittleSwalConfirmButtonSwalConfirm(){
        return this.tittleSwalConfirm.getText();
    }
}
