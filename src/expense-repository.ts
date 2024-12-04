import fs from 'node:fs/promises';
import Expense from './expense';

type RawExpense = {
    id: number;
    description: string;
    amount: number;
    createdAt: string;
};

export default class ExpenseRepository {
    private path: string = './expenses.json';

    public constructor() {}

    public async findAll(): Promise<Expense[]> {
        if (!(await fs.exists(this.path))) {
            await this.overwriteAll([]);
        }
        if (!(await fs.readFile(this.path, 'utf-8'))) {
            await this.overwriteAll([]);
        }

        let expensesRaw = JSON.parse(
            await fs.readFile(this.path, 'utf-8')
        ) as Expense[];
        if (!this.isExpensesRaw(expensesRaw)) {
            throw new Error('Invalid data: The JSON file is corrupted');
        }

        const expenses = this.toExpenses(expensesRaw);
        return expenses.sort((a, b) => a.getId() - b.getId());
    }

    public async findById(id: number): Promise<Expense | undefined> {
        id = typeof id === 'number' ? id : Number(id);
        return (await this.findAll()).find((expense) => expense.getId() === id);
    }

    public async findByMonth(month: number): Promise<Expense[]> {
        month = typeof month === 'number' ? month : Number(month);
        return (await this.findAll()).filter(
            (expense) => expense.getCreatedAt().getMonth() + 1 === month
        );
    }

    public async save(expense: Expense) {
        const expenses = await this.findAll();

        if (expense.getId() === -1) {
            expense.setId(this.nextValidId(expenses));
        } else {
            const toUpdate = expenses.find(
                (_expense) => _expense.getId() === expense.getId()
            );
            if (toUpdate) {
                expenses.splice(expenses.indexOf(toUpdate), 1);
            }
        }
        expenses.push(expense);
        await this.overwriteAll(expenses);
        return expense;
    }

    public async deleteById(id: number): Promise<Expense | null> {
        id = typeof id === 'number' ? id : Number(id);
        const expenses = await this.findAll();
        const toDelete = expenses.find((expense) => expense.getId() === id);
        if (!toDelete) return null;

        expenses.splice(expenses.indexOf(toDelete), 1);
        await this.overwriteAll(expenses);
        return toDelete;
    }

    private nextValidId(expenses: Expense[]): number {
        if (!expenses || expenses.length === 0) return 1;

        const sortedExpenses = expenses.sort((a, b) => b.getId() - a.getId());
        return sortedExpenses[0].getId() + 1;
    }

    private async overwriteAll(expenses: Expense[]) {
        const json = JSON.stringify(expenses, null, 2);
        await fs.writeFile(this.path, json, 'utf-8');
    }

    private isExpenseRaw(value: unknown): value is RawExpense {
        if (!value || typeof value !== 'object') {
            return false;
        }

        const object = value as Record<string, unknown>;

        return (
            typeof object.id === 'number' &&
            typeof object.description === 'string' &&
            typeof object.amount === 'number' &&
            typeof object.createdAt === 'string' &&
            !isNaN(Date.parse(object.createdAt))
        );
    }

    private isExpensesRaw(value: unknown): value is RawExpense[] {
        return Array.isArray(value) && value.every(this.isExpenseRaw);
    }

    private toExpense(rExpense: RawExpense): Expense {
        return new Expense(
            rExpense.description,
            rExpense.amount,
            rExpense.id,
            new Date(rExpense.createdAt)
        );
    }

    private toExpenses(rExpenses: RawExpense[]): Expense[] {
        return rExpenses.map((ex) => this.toExpense(ex));
    }
}
