// src/commands/report.ts
import { Command } from "commander";
import { StorageService } from "../services/storage";
import { ReportService } from "../services/report";
import { logger } from "../utils/logger";

export function reportCommand(program: Command) {
  program
    .command("report")
    .description("Muestra un resumen de ingresos, gastos y balance")
    .action(async () => {
      const transactions = await StorageService.getTransactions();

      if (transactions.length === 0) {
        logger.warn("⚠ No hay transacciones registradas.");
        return;
      }

      const report = ReportService.generateReport(transactions);

      logger.info("📊 Reporte Financiero:");
      console.log("----------------------------");
      console.log(`💰 Ingresos:  ${report.totalIngresos}`);
      console.log(`💸 Gastos:   ${report.totalGastos}`);
      console.log(`📈 Balance:  ${report.balance}`);
      console.log("----------------------------");

      if (report.balance >= 0) {
        logger.success("✅ ¡Tienes un balance positivo!");
      } else {
        logger.error("❌ Cuidado, estás en negativo.");
      }
    });
}
