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

    constructor(id: string, city: string, address: string, productId: number, product: Producto,
                materialCount: number, materialUnit: string, contactPerson: string,
                contactNumber: string, dayToDispatch: string, createdAt: string,
                updateAt: string, deletedAt: string, userId: number, user: User) {
        this.id = id;
        this.city = city;
        this.address = address;
        this.productId = productId;
        this.product = product;
        this.materialCount = materialCount;
        this.materialUnit = materialUnit;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber;
        this.dayToDispatch = dayToDispatch;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.deletedAt = deletedAt;
        this.userId = userId;
        this.user = user;
    }
}
