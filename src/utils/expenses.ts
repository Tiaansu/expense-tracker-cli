import fs from 'node:fs/promises';

export type Expense = {
    id: number;
    date: Date;
    description: string;
    amount: number;
};

if (!(await fs.exists(`${process.cwd()}/expenses.json`))) {
    await fs.writeFile(`${process.cwd()}/expenses.json`, '[]');
}

export let expenses = JSON.parse(
    await fs.readFile(`${process.cwd()}/expenses.json`, 'utf-8')
) as Expense[];

export async function updateExpenses() {
    await fs.writeFile(
        `${process.cwd()}/expenses.json`,
        JSON.stringify(expenses, null, 2)
    );
}
