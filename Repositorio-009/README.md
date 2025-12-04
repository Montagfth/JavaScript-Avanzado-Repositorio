# Proyectos | JavaScript Avanzado
Desarrollo de proyectos en el transcurso del ciclo:
## PROYECTO-001
# 💰 Finanzas CLI

Un **CLI (Command Line Interface)** para gestionar **finanzas personales** (ingresos, gastos y reportes) usando **Node.js + TypeScript**.

Con este proyecto aprenderás:

✅ Cómo crear un programa de consola con **TypeScript y Node.js**  
✅ Cómo usar **Commander.js** para crear comandos (`add`, `report`, `export`)  
✅ Cómo almacenar datos en **JSON** y exportarlos a **CSV/Excel (XLSX)**  
✅ Cómo darle colores y tablas pro con **Chalk + cli-table3**  
✅ Cómo compilar con **TypeScript (tsc)** y usarlo globalmente con `npm link`  

---

## 📂 Estructura del Proyecto

```
finanzas-cli/
├── src/
│   ├── index.ts                 # Entrada principal del CLI
│   ├── commands/                # Comandos del CLI
│   │   ├── add.ts              # Agregar ingresos/gastos
│   │   ├── report.ts           # Reporte en consola (tabla pro)
│   │   └── export.ts           # Exportar a CSV / JSON / XLSX
│   ├── models/                 # Definición de interfaces
│   │   └── transaction.ts      # Modelo de transacción
│   ├── services/               # Lógica de negocio
│   │   ├── storage.ts          # Guardar/leer transacciones en JSON
│   │   └── report.ts           # Calcular totales, balance, etc.
│   ├── utils/                  # Utilidades
│   │   └── logger.ts           # Colorear logs en consola
│   └── config.ts               # Configuración general
├── data/
│   └── transactions.json       # Base de datos local (movimientos 💾)
├── dist/                       # Código compilado a JS
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Documentación
```

---

## ⚙️ Instalación

1. **Clona el repositorio** o crea la carpeta:
   ```bash
   git clone https://github.com/tuusuario/finanzas-cli.git
   cd finanzas-cli
   ```

2. **Instala dependencias**:
   ```bash
   npm install
   ```

3. **Compila el proyecto**:
   ```bash
   npm run build
   ```

4. **(Opcional) Enlázalo globalmente**:
   ```bash
   npm link
   ```

   Ahora puedes usar el comando `finanzas` en cualquier parte de tu terminal 🚀

---

## 🖥️ Uso

### ➕ Agregar movimientos

```bash
finanzas add ingreso 500 "Venta freelance"
finanzas add gasto 100 "Comida rápida"
```

- **ingreso** → dinero que entra
- **gasto** → dinero que sale

### 📊 Reporte en consola

```bash
finanzas report
```

**Ejemplo de salida:**

```
┌──────────────┬─────────┬──────────────┬─────────────────┐
│ Fecha        │ Tipo    │ Monto        │ Descripción     │
├──────────────┼─────────┼──────────────┼─────────────────┤
│ 19/09/2025   │ INGRESO │ 500.00 PEN   │ Venta freelance │
│ 19/09/2025   │ GASTO   │ 100.00 PEN   │ Comida rápida   │
└──────────────┴─────────┴──────────────┴─────────────────┘

💰 Total Ingresos: 500.00 PEN
💸 Total Gastos:   100.00 PEN
📈 Balance:        400.00 PEN
```

### 📤 Exportar datos

**Exportar a CSV:**
```bash
finanzas export --csv reporte.csv
```

**Exportar a JSON:**
```bash
finanzas export --json reporte.json
```

**Exportar a Excel (XLSX):**
```bash
finanzas export --xlsx reporte.xlsx
```

**Filtros opcionales:**
```bash
finanzas export --csv reporte.csv -m 9 -y 2025
```

👉 Exporta solo las transacciones de **septiembre 2025**.

---

## 🛠️ Scripts de desarrollo

- `npm run dev` → ejecutar el CLI directamente con TypeScript
- `npm run build` → compilar TypeScript a JavaScript (carpeta `dist/`)
- `npm start` → ejecutar el proyecto compilado  
- `npm run cli -- <comando>` → ejecutar el CLI desde npm scripts

**Ejemplo:**
```bash
npm run cli -- add ingreso 200 "Trabajo extra"
npm run cli -- report
```

---

## 🧑‍💻 Tecnologías usadas

- **Node.js** → entorno de ejecución
- **TypeScript** → tipado y estructura profesional
- **Commander.js** → creación de comandos CLI
- **Chalk** → colores en consola
- **cli-table3** → tablas en consola
- **ExcelJS** → exportación a Excel
- **UUID** → generar identificadores únicos
- **JSON local** → base de datos simple para transacciones

---

## 🚀 Posibles mejoras

- Soporte para **SQLite** o **MongoDB** en lugar de JSON
- Categorías personalizadas (ej: comida, transporte, ocio)
- Gráficos en consola con librerías como `asciichart`
- Exportación en **PDF** con reportes
- Integración con **Google Sheets**
- Filtros avanzados por fecha y categoría
- Backup automático en la nube
- Soporte para múltiples monedas

---

## 📚 Aprendizaje clave

1. Cómo estructurar un **proyecto CLI real** en Node.js + TypeScript
2. Cómo usar **Commander.js** para registrar comandos
3. Cómo persistir datos en **JSON** y manipularlos
4. Cómo generar **reportes en tablas** con colores
5. Cómo exportar a **Excel** y **CSV**
6. Manejo de argumentos y opciones en CLI
7. Compilación y distribución de proyectos TypeScript

---

## 🏗️ Instalación desde cero

Si quieres crear este proyecto desde cero, sigue estos pasos:

1. **Inicializar proyecto**:
   ```bash
   mkdir finanzas-cli && cd finanzas-cli
   npm init -y
   ```

2. **Instalar dependencias**:
   ```bash
   npm install commander chalk cli-table3 exceljs uuid
   npm install -D typescript @types/node ts-node nodemon
   ```

3. **Configurar TypeScript**:
   ```bash
   npx tsc --init
   ```

4. **Agregar scripts en package.json**:
   ```json
   {
     "scripts": {
       "dev": "ts-node src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js",
       "cli": "ts-node src/index.ts"
     },
     "bin": {
       "finanzas": "./dist/index.js"
     }
   }
   ```

---

## 🏆 Autor

👨‍💻 **Diego Arroyo**  
📧 **tmldiego0@gmail.com**  
🌐 **[GitHub](https://github.com/Reverse07)**  

---

📌 **Proyecto educativo** de práctica para dominar **Node.js + TypeScript CLI**.

---

## 📄 Licencia

MIT License - consulta el archivo [LICENSE](LICENSE) para más detalles.
