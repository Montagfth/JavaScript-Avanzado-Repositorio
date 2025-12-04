"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
class ReportService {
    static generateReport(transactions) {
        const totalIngresos = transactions
            .filter(t => t.type === "ingreso")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalGastos = transactions
            .filter(t => t.type === "gasto")
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIngresos - totalGastos;
        return {
            totalIngresos,
            totalGastos,
            balance,
        };
    }
}
exports.ReportService = ReportService;
//# sourceMappingURL=report.js.map