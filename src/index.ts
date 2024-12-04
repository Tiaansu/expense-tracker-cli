import { Command } from 'commander';

import { makeAddCommand } from './commands/add.command';
import { makeListCommand } from './commands/list.command';
import { makeSummaryCommand } from './commands/summary.command';
import { makeDeleteCommand } from './commands/delete.command';
import { makeUpdateCommand } from './commands/update.command';
import { makeExportCommand } from './commands/export.command';

const program = new Command();

program
    .name('expense-tracker')
    .description('CLI to track your expenses')
    .version('0.0.1')
    .addCommand(makeAddCommand())
    .addCommand(makeListCommand())
    .addCommand(makeSummaryCommand())
    .addCommand(makeDeleteCommand())
    .addCommand(makeUpdateCommand())
    .addCommand(makeExportCommand())
    .parse();
