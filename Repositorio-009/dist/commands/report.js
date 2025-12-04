"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportCommand = reportCommand;
const storage_1 = require("../services/storage");
const report_1 = require("../services/report");
const logger_1 = require("../utils/logger");
function reportCommand(program) {
    program
        .command("report")
        .description("Muestra un resumen de ingresos, gastos y balance")
        .action(async () => {
        const transactions = await storage_1.StorageService.getTransactions();
        if (transactions.length === 0) {
            logger_1.logger.warn("⚠ No hay transacciones registradas.");
            return;
        }
        const report = report_1.ReportService.generateReport(transactions);
        logger_1.logger.info("📊 Reporte Financiero:");
        console.log("----------------------------");
        console.log(`💰 Ingresos:  ${report.totalIngresos}`);
        console.log(`💸 Gastos:   ${report.totalGastos}`);
        console.log(`📈 Balance:  ${report.balance}`);
        console.log("----------------------------");
        if (report.balance >= 0) {
            logger_1.logger.success("✅ ¡Tienes un balance positivo!");
        }
        else {
            logger_1.logger.error("❌ Cuidado, estás en negativo.");
        }
    });
}
//# sourceMappingURL=report.js.map