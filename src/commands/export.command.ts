import { Command } from 'commander';
import { json2csv } from 'json-2-csv';
import ExpenseRepository from '../expense-repository';
import fs from 'node:fs/promises';

export function makeExportCommand() {
    return new Command('export')
        .description('Export expenses to a csv file')
        .action(async () => {
            const repo = new ExpenseRepository();
            const expenses = (await repo.findAll()).map((expense) => {
                return {
                    id: expense.getId(),
                    description: expense.getDescription(),
                    amount: expense.getAmount(),
                    date: `${
                        expense.getCreatedAt().toISOString().split('T')[0]
                    }`,
                };
            });

            if (expenses.length === 0)
                return console.warn(`There is no expense yet.`);

            const csv = json2csv(expenses);
            await fs.writeFile('expenses.csv', csv);
            console.log(`Successfully exported expenses to expenses.csv`);
        });
}
