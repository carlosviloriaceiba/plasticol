import { User } from '@core/modelo/user';
// tslint:disable-next-line: no-feature-imports
import { Producto } from '@producto/shared/model/producto';



export class Solicitud {
    id: string;
    city: string;
    address: string;
    productId: number;
    product?: Producto;
    materialCount: number;
    materialUnit: string;
    contactPerson: string;
    contactNumber: string;
    dayToDispatch: string;
    createdAt: string;
    updateAt: string;
    deletedAt: string;
    userId: number;
    user?: User;

    constructor(id: string, address: string, productId: number,
                materialCount: number, materialUnit: string,
                contactNumber: string, dayToDispatch: string) {
        this.id = id;
        this.address = address;
        this.productId = productId;
        this.materialCount = materialCount;
        this.materialUnit = materialUnit;
        this.contactNumber = contactNumber;
        this.dayToDispatch = dayToDispatch;
    }
}
