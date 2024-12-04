import { Command } from 'commander';
import ExpenseRepository from '../expense-repository';

export function makeUpdateCommand() {
    return new Command('update')
        .description('Update an expense')
        .option('--id <id>', 'The id of expense you want to update')
        .option('--description <description>', 'Description of the expense')
        .option('--amount <amount>', 'Amount of the expense')
        .action(
            async (options: {
                id: number;
                description: string;
                amount: number;
            }) => {
                const { id, description, amount } = options;

                if (!description && !amount)
                    return console.warn(
                        `Pass either --description or --amount.`
                    );
                if (Number.isNaN(id)) return console.warn(`Pass a valid id.`);
                if (Number.isNaN(amount) || amount < 1)
                    return console.warn(`Pass a valid amount.`);

                const repo = new ExpenseRepository();
                const expense = await repo.findById(id);
                if (!expense)
                    return console.warn(`No expense found with id ${id}`);

                if (description) expense.setDescription(description);
                if (amount) expense.setAmount(amount);
                await repo.save(expense);
                console.log(`Successfully updated expense ID ${id}`);
            }
        );
}
