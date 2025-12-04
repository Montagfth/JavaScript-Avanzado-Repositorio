import { promises as fs } from "fs";
import { Transaction } from "../models/transaction";
import * as path from "path";

// Ruta al archivo donde se guardan las transacciones
const DATA_DIR = path.resolve(__dirname, "../../data");
const DATA_PATH = path.join(DATA_DIR, "transactions.json");

export class StorageService {
  // Verifica que el archivo y carpeta existan
  private static async ensureDataFile() {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true }); // crea la carpeta si no existe
      await fs.access(DATA_PATH); // verifica si existe el archivo
    } catch {
      // Si no existe el archivo, lo inicializamos vacío
      await fs.writeFile(DATA_PATH, "[]", "utf-8");
    }
  }

  // Leer todas las transacciones
  static async getTransactions(): Promise<Transaction[]> {
    await this.ensureDataFile();
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return data ? (JSON.parse(data) as Transaction[]) : [];
  }

  // Guardar una transacción nueva
  static async addTransaction(transaction: Transaction): Promise<void> {
    const transactions = await this.getTransactions();
    transactions.push(transaction);
    await fs.writeFile(DATA_PATH, JSON.stringify(transactions, null, 2), "utf-8");
  }
}
