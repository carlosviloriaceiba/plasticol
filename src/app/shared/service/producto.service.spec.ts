import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;
  const productos = [
      {
      id: 1,
      name: 'Poliestireno (PS)',
      active: true,
      price: 300,
      percentage_surcharge: 10,
      created_at: '2021-01-01 08:00:59',
      update_at: '2021-01-01 08:00:59',
      deleted_at: null
    },
    {
      id: 2,
      name: 'PET',
      active: true,
      price: 250,
      percentage_surcharge: 10,
      created_at: '2021-01-01 08:00:59',
      update_at: '2021-01-01 08:00:59',
      deleted_at: null
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [HttpService]
    });
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia retornar producto por ID', () => {
   const result = service.returnProductoById(productos, 1);

   expect(result).toEqual(productos[0]);
  });

  it('deberia retornar producto por ID null', () => {
    const result = service.returnProductoById(productos, 3);

    expect(result).toBeNull();
   });
});
