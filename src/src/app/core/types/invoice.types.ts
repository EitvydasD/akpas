import { BaseType } from './base.types';
import { Supplier } from './supplier.types';

export type Invoice = BaseType & {
  status: string;
  payDate: Date;
  generationDate: Date;
  supplier: Supplier;
  operations: BalanceOperation[];
  accountId: string;
};

export type BalanceOperation = BaseType & {
  operation: string;
  date: Date;
  amount: number;
};
