import { Command } from 'commander';
import type Expense from '../expense';
import ExpenseRepository from '../expense-repository';

export function makeSummaryCommand() {
    return new Command('summary')
        .description('Summarizes your expenses')
        .option('--month <month>', 'The month you want to summarize')
        .action(async (options: { month: number }) => {
            const { month } = options;
            const repo = new ExpenseRepository();

            let expenses: Expense[];
            if (month || month === 0) {
                if (Number.isNaN(month)) return console.warn(`Invalid month`);
                if (month < 1 || month > 12)
                    return console.warn(`Month must be between 1 and 12`);
                expenses = await repo.findByMonth(month);
            } else {
                expenses = await repo.findAll();
            }

            const totalExpenses = expenses.reduce(
                (prev, curr) => prev + curr.amount,
                0
            );

            console.log(
                `Total expenses${
                    month ? ` for ${month}` : ''
                }: $${totalExpenses}`
            );
        });
}
