export class Summary {
    requestTon: number;
    pendingTon: number;
    percentageSuccessRequest: number;

    constructor(requestTon: number, pendingTon: number, percentageSuccessRequest: number) {
        this.requestTon = requestTon;
        this.pendingTon = pendingTon;
        this.percentageSuccessRequest = percentageSuccessRequest;
    }
}
