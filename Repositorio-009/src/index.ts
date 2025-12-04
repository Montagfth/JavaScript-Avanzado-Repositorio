import { Command } from "commander";
import { addCommand } from "./commands/add";
import { reportCommand } from "./commands/report";
import { exportCommand } from "./commands/export";

const program = new Command();
program.name("finanzas").version("1.0.0");

addCommand(program);
reportCommand(program);
exportCommand(program);

program.parse(process.argv);
if (process.argv.length <= 2) program.outputHelp();
