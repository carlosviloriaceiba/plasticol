import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorCamposPlantillaComponent } from './error-campos-plantilla.component';

describe('ErrorCamposPlantillaComponent', () => {
  let component: ErrorCamposPlantillaComponent;
  let fixture: ComponentFixture<ErrorCamposPlantillaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCamposPlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCamposPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia chequear set text', () => {
    const text = spyOnProperty(component, 'text', 'set').and.callThrough();

    component.text = 'Nuevo mensaje';

    expect(text).toHaveBeenCalledWith('Nuevo mensaje');

  });

  it('deberia chequear set text  iguales', () => {
    component.mensajeError = 'Nuevo mensaje';
    const primerValor = component.mensajeError;

    const segundoValor = spyOnProperty(component, 'text', 'set').and.callThrough();


    component.text = 'Nuevo mensaje';


    expect(segundoValor).toHaveBeenCalledWith(primerValor);

  });
});
