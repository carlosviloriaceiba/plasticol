export class Producto {

    id: string;
    name: string;
    active: boolean;
    price: number;
    percentageSurcharge: number;
    createdAt: string;
    updateAt: string;
    deletedAt: string;

    constructor(id: string, name: string, active: boolean, price: number, 
                percentageSurcharge: number, createdAt: string,updateAt: string, deletedAt: string) {
        this.id = id;
        this.name = name;
        this.active = active;
        this.price = price;
        this.percentageSurcharge = percentageSurcharge;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.deletedAt = deletedAt;
    }
}
