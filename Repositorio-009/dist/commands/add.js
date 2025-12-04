"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = addCommand;
const uuid_1 = require("uuid");
const storage_1 = require("../services/storage");
const logger_1 = require("../utils/logger");
function addCommand(program) {
    program
        .command("add <type> <amount> <description>")
        .description("Agrega una transacción (gasto o ingreso)")
        .action(async (type, amount, description) => {
        if (type !== "gasto" && type !== "ingreso") {
            logger_1.logger.error("❌ El tipo debe ser 'gasto' o 'ingreso'.");
            return;
        }
        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0) {
            logger_1.logger.error("❌ El monto debe ser un número positivo.");
            return;
        }
        const newTransaction = {
            id: (0, uuid_1.v4)(), // <-- UUID string
            type: type, // tipo ya validado
            amount: value,
            description,
            date: new Date().toISOString()
        };
        await storage_1.StorageService.addTransaction(newTransaction);
        logger_1.logger.success(`✅ ${type} agregado: ${value} (${description})`);
    });
}
//# sourceMappingURL=add.js.map