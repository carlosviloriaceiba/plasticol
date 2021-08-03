import { User } from '@shared/model/user';
import { Producto } from '@shared/model/producto';



export interface Solicitud {
    id: string | number;
    city: string;
    address: string;
    productId: number;
    product?: Producto;
    material_count: number;
    material_unit: string;
    contact_person: string;
    contact_number: string;
    day_to_dispatch: string;
    created_at: string;
    update_at: string;
    deleted_at: string;
    userId: number;
    user?: User;
    status?: string;
    total_price?: string;

}
