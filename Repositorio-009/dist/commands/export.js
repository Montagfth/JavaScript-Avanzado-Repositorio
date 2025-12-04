"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCommand = exportCommand;
const path = require("path");
const fs = require("fs");
const storage_1 = require("../services/storage");
const logger_1 = require("../utils/logger");
const chalk_1 = require("chalk");
const Table = require("cli-table3");
const ExcelJS = require("exceljs");
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
function escapeCsv(s, sep = ",") {
    if (s.includes(sep) || s.includes('"') || s.includes("\n")) {
        return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
}
function exportCommand(program) {
    program
        .command("export")
        .description("Exportar transacciones a CSV, JSON o Excel con estilo 😎")
        .option("--csv <salida>", "Ruta de salida para CSV")
        .option("--json <salida>", "Ruta de salida para JSON")
        .option("--xlsx <salida>", "Ruta de salida para Excel")
        .option("-m, --month <month>", "Filtrar por mes (1-12)")
        .option("-y, --year <year>", "Filtrar por año (ej: 2025)")
        .option("--sep <sep>", "Separador CSV (por defecto ,)", ",")
        .action(async (options) => {
        try {
            const all = await storage_1.StorageService.getTransactions();
            if (!all || all.length === 0) {
                logger_1.logger.warn("⚠️ No hay transacciones para exportar.");
                return;
            }
            const month = options.month ? Number(options.month) : undefined;
            const year = options.year ? Number(options.year) : undefined;
            const filtered = all.filter((t) => {
                const d = new Date(t.date);
                if (month && d.getMonth() + 1 !== month)
                    return false;
                if (year && d.getFullYear() !== year)
                    return false;
                return true;
            });
            if (filtered.length === 0) {
                logger_1.logger.warn("⚠️ No hay transacciones que coincidan con el filtro.");
                return;
            }
            // === Mostrar preview en tabla ===
            const table = new Table({
                head: [
                    chalk_1.default.cyan("ID"),
                    chalk_1.default.cyan("TIPO"),
                    chalk_1.default.cyan("MONTO"),
                    chalk_1.default.cyan("DESCRIPCIÓN"),
                    chalk_1.default.cyan("CATEGORÍA"),
                    chalk_1.default.cyan("FECHA"),
                    chalk_1.default.cyan("MONEDA"),
                ],
                style: { head: [], border: [] },
                colWidths: [8, 10, 12, 25, 15, 20, 10],
                wordWrap: true,
            });
            filtered.forEach((t) => {
                table.push([
                    chalk_1.default.yellow(t.id),
                    t.type === "ingreso" ? chalk_1.default.green("INGRESO") : chalk_1.default.red("GASTO"),
                    chalk_1.default.bold(t.amount.toFixed(2)),
                    t.description,
                    t.category ?? "-",
                    formatDate(t.date),
                    chalk_1.default.magenta(t.currency ?? "PEN"),
                ]);
            });
            console.log("\n" + chalk_1.default.bold.green("📊 Vista previa de transacciones exportadas:"));
            console.log(table.toString());
            // === Exportar JSON si se pidió ===
            if (options.json) {
                const outJson = path.resolve(options.json);
                await fs.promises.writeFile(outJson, JSON.stringify(filtered, null, 2), "utf8");
                logger_1.logger.success(`✅ Exportado JSON a ${outJson}`);
            }
            // === Exportar CSV si se pidió ===
            if (options.csv) {
                const headers = ["ID", "TIPO", "MONTO", "DESCRIPCIÓN", "CATEGORÍA", "FECHA", "MONEDA"];
                const sep = options.sep || ",";
                const lines = [headers.join(sep)].concat(filtered.map((t) => [
                    t.id,
                    t.type.toUpperCase(),
                    t.amount.toFixed(2),
                    escapeCsv(t.description, sep),
                    t.category ?? "",
                    formatDate(t.date),
                    t.currency ?? "PEN",
                ].join(sep)));
                const outCsv = path.resolve(options.csv);
                await fs.promises.writeFile(outCsv, lines.join("\n"), "utf8");
                logger_1.logger.success(`✅ Exportado CSV a ${outCsv}`);
            }
            // === Exportar Excel si se pidió ===
            if (options.xlsx) {
                const outXlsx = path.resolve(options.xlsx);
                const workbook = new ExcelJS.Workbook();
                const sheet = workbook.addWorksheet("Transacciones");
                // Cabecera con estilos
                sheet.columns = [
                    { header: "ID", key: "id", width: 10 },
                    { header: "TIPO", key: "type", width: 12 },
                    { header: "MONTO", key: "amount", width: 15 },
                    { header: "DESCRIPCIÓN", key: "description", width: 30 },
                    { header: "CATEGORÍA", key: "category", width: 20 },
                    { header: "FECHA", key: "date", width: 22 },
                    { header: "MONEDA", key: "currency", width: 10 },
                ];
                sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
                sheet.getRow(1).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FF007ACC" }, // azul estilo VS Code
                };
                filtered.forEach((t) => {
                    sheet.addRow({
                        id: t.id,
                        type: t.type.toUpperCase(),
                        amount: t.amount,
                        description: t.description,
                        category: t.category ?? "-",
                        date: formatDate(t.date),
                        currency: t.currency ?? "PEN",
                    });
                });
                // Estilo para la columna de tipo (ingreso verde, gasto rojo)
                sheet.eachRow((row, idx) => {
                    if (idx === 1)
                        return; // saltar cabecera
                    const tipoCell = row.getCell(2);
                    if (tipoCell.value === "INGRESO") {
                        tipoCell.font = { color: { argb: "FF008000" }, bold: true }; // verde
                    }
                    else {
                        tipoCell.font = { color: { argb: "FFFF0000" }, bold: true }; // rojo
                    }
                });
                await workbook.xlsx.writeFile(outXlsx);
                logger_1.logger.success(`✅ Exportado Excel a ${outXlsx}`);
            }
        }
        catch (err) {
            logger_1.logger.error(`❌ Error exportando transacciones: ${err.message || err}`);
        }
    });
}
//# sourceMappingURL=export.js.map