"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const add_1 = require("./commands/add");
const report_1 = require("./commands/report");
const export_1 = require("./commands/export");
const program = new commander_1.Command();
program.name("finanzas").version("1.0.0");
(0, add_1.addCommand)(program);
(0, report_1.reportCommand)(program);
(0, export_1.exportCommand)(program);
program.parse(process.argv);
if (process.argv.length <= 2)
    program.outputHelp();
//# sourceMappingURL=index.js.map