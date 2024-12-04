import { Command } from 'commander';
import ExpenseRepository from '../expense-repository';
import { printTable } from 'console-table-printer';

export function makeListCommand() {
    return new Command('list')
        .description('List your expenses in a table format')
        .action(async () => {
            const table: {
                id: number;
                date: string;
                description: string;
                amount: string;
            }[] = [];

            const repo = new ExpenseRepository();
            (await repo.findAll()).map(
                ({ id, amount, createdAt, description }) => {
                    table.push({
                        id,
                        description,
                        amount: `$${amount}`,
                        date: `${
                            new Date(createdAt).toISOString().split('T')[0]
                        }`,
                    });
                }
            );

            if (!table.length) return console.log(`There is no expense yet.`);
            printTable(table);
        });
}
