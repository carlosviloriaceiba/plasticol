export class Producto {

    id: string;
    name: string;
    active: boolean;
    price: number;
    percentageSurcharge: number;
    createdAt: string;
    updateAt: string;
    deletedAt: string;

    constructor(id: string, name: string, price: number, percentageSurcharge: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.percentageSurcharge = percentageSurcharge;
    }
}
