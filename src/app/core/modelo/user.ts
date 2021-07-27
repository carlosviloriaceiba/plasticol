export class User {
    id: string;
    name: string;
    lastName: string;
    document: string;
    nit: string;
    email: string;
    status: string;
    type: string;
    password: string;
    createdAt: string;
    updateAt: string;
    deletedAt: string;




    constructor(id: string, name: string, lastName: string, document: string,
                nit: string, email: string, status: string, type: string, createdAt: string,
                updateAt: string, deletedAt: string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.document = document;
        this.nit = nit;
        this.email = email;
        this.status = status;
        this.type = type;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.deletedAt = deletedAt;
    }
}
