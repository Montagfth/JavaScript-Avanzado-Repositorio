"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const fs_1 = require("fs");
const path = require("path");
// Ruta al archivo donde se guardan las transacciones
const DATA_DIR = path.resolve(__dirname, "../../data");
const DATA_PATH = path.join(DATA_DIR, "transactions.json");
class StorageService {
    // Verifica que el archivo y carpeta existan
    static async ensureDataFile() {
        try {
            await fs_1.promises.mkdir(DATA_DIR, { recursive: true }); // crea la carpeta si no existe
            await fs_1.promises.access(DATA_PATH); // verifica si existe el archivo
        }
        catch {
            // Si no existe el archivo, lo inicializamos vacío
            await fs_1.promises.writeFile(DATA_PATH, "[]", "utf-8");
        }
    }
    // Leer todas las transacciones
    static async getTransactions() {
        await this.ensureDataFile();
        const data = await fs_1.promises.readFile(DATA_PATH, "utf-8");
        return data ? JSON.parse(data) : [];
    }
    // Guardar una transacción nueva
    static async addTransaction(transaction) {
        const transactions = await this.getTransactions();
        transactions.push(transaction);
        await fs_1.promises.writeFile(DATA_PATH, JSON.stringify(transactions, null, 2), "utf-8");
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.js.map