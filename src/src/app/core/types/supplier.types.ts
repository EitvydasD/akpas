import { BaseType } from './base.types';

export type Supplier = BaseType & {
  name: string;
  speciality: string;
  valueType: string;
  rate: number;
  enabled: boolean;
};
