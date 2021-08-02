import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Producto } from '@shared/model/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpService: HttpService) { }

  public consultarProductos() {
    return this.httpService.doGet<Producto[]>(`${environment.endpoint}/products`,
                                                this.httpService.optsName('obtener productos maestro'));
  }

  public returnProductoById(productos, id) {
    const value = productos.findIndex(producto => producto.id === +id);
    return value !== -1 ? productos[value] : null;
  }

}
