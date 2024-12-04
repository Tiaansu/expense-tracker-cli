export default class Expense {
    private id: number;
    private description: string;
    private amount: number;
    private createdAt: Date;

    public constructor(
        description: string,
        amount: number,
        id?: number,
        createdAt?: Date
    ) {
        this.id = id ?? -1;
        this.description = description;
        this.amount = Number(amount);

        this.createdAt = createdAt ?? new Date();
    }

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getDescription() {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getAmount() {
        return this.amount;
    }

    public setAmount(amount: number) {
        this.amount = amount;
    }

    public getCreatedAt() {
        return this.createdAt;
    }
}
