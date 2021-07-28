export interface Producto {

    id: string | number;
    name: string;
    active?: boolean;
    price: number;
    percentage_surcharge: number;
    created_at: string;
    update_at: string;
    deleted_at?: string;


}
