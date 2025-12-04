"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = require("chalk");
exports.logger = {
    success: (msg) => console.log(chalk_1.default.green(msg)),
    error: (msg) => console.log(chalk_1.default.red(msg)),
    info: (msg) => console.log(chalk_1.default.blue(msg)),
    warn: (msg) => console.log(chalk_1.default.yellow(msg)),
};
//# sourceMappingURL=logger.js.map