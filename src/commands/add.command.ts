import { Command } from 'commander';
import Expense from '../expense';
import ExpenseRepository from '../expense-repository';

export function makeAddCommand() {
    return new Command('add')
        .description('Add an expense')
        .option('--description <description>', 'Description of the expense')
        .option('--amount <amount>', 'Amount of the expense')
        .action(async (options: { description: string; amount: number }) => {
            const { description, amount } = options;

            if (!description)
                return console.warn('You must add a description.');
            if (!amount) return console.warn('You must specifiy an amount.');

            if (Number.isNaN(amount) || amount < 1) {
                return console.warn(
                    "You can't add a negative, non-number, or zero amount."
                );
            }

            const expense = new Expense(description, amount);
            const repo = new ExpenseRepository();
            const id = (await repo.save(expense)).getId();
            console.log(`Expense added successfully (ID: ${id})`);
        });
}
