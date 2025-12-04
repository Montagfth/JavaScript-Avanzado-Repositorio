// src/services/report.ts
import { Transaction } from "../models/transaction";

export class ReportService {
  static generateReport(transactions: Transaction[]) {
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
