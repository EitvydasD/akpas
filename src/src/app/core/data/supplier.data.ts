import { Supplier } from '../types/supplier.types';

export const SUPPLIER_IGNITIS: Supplier = {
  id: 'ignitis',
  name: 'UAB "Ignitis"',
  speciality: 'Elektros energija',
  valueType: 'kWh',
  rate: 0.2,
  enabled: true,
};

export const SUPPLIER_VANDENYS: Supplier = {
  id: 'vandenys',
  name: 'Aukštaitijos vandenys, UAB',
  speciality: 'Vandens tiekimas',
  valueType: 'm3',
  rate: 0.5,
  enabled: false,
};

export const SUPPLIERS: Supplier[] = [SUPPLIER_IGNITIS, SUPPLIER_VANDENYS];
