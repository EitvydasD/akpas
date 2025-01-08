import { BaseType } from './base.types';
import { Supplier } from './supplier.types';

export type Numerator = BaseType & {
  type: 'Automatinis' | 'Rankinis';
  values: NumeratorValues[];
  supplier: Supplier;
};

export type NumeratorValues = BaseType & {
  date: Date;
  forDate: Date;
  value: number;
  usedValue?: number;
  origin: string;
};
