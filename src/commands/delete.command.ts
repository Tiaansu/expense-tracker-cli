import { Command } from 'commander';
import ExpenseRepository from '../expense-repository';

export function makeDeleteCommand() {
    return new Command('delete')
        .description('Delete an expense')
        .option('--id <id>', 'The id of expense you want to delete')
        .action(async (options: { id: number }) => {
            const { id } = options;

            if (Number.isNaN(id))
                return console.warn('You must specify an id.');

            const repo = new ExpenseRepository();
            const deleted = await repo.deleteById(id);
            if (!deleted) {
                console.warn(`There was no expense id ${id} found`);
            } else {
                console.log(`Expense deleted successfully`);
            }
        });
}
