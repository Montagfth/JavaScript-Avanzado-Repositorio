// src/models/transaction.ts
export type TransactionType = "ingreso" | "gasto";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string; // ISO
  category?: string;
  currency?: string;
}
