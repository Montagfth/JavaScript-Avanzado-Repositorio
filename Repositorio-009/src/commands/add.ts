// src/commands/add.ts
import { Command } from "commander";
import { v4 as uuidv4 } from "uuid";
import { StorageService } from "../services/storage";
import { Transaction } from "../models/transaction";
import { logger } from "../utils/logger";

export function addCommand(program: Command) {
  program
    .command("add <type> <amount> <description>")
    .description("Agrega una transacción (gasto o ingreso)")
    .action(async (type: string, amount: string, description: string) => {
      if (type !== "gasto" && type !== "ingreso") {
        logger.error("❌ El tipo debe ser 'gasto' o 'ingreso'.");
        return;
      }

      const value = parseFloat(amount);
      if (isNaN(value) || value <= 0) {
        logger.error("❌ El monto debe ser un número positivo.");
        return;
      }

      const newTransaction: Transaction = {
        id: uuidv4(),                      // <-- UUID string
        type: type as "ingreso" | "gasto", // tipo ya validado
        amount: value,
        description,
        date: new Date().toISOString()
      };

      await StorageService.addTransaction(newTransaction);
      logger.success(`✅ ${type} agregado: ${value} (${description})`);
    });
}
