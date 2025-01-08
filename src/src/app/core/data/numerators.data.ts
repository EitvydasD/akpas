import { Numerator } from '../types/numerator.types';
import { SUPPLIER_IGNITIS } from './supplier.data';

export const NUMERATORS: Numerator[] = [
  {
    id: 'S10000',
    type: 'Automatinis',
    values: [
      {
        id: 'S10000-1',
        date: new Date('2021-01-02'),
        forDate: new Date('2021-01-01'),
        value: 1,
        origin: 'akpas',
      },
    ],
    supplier: SUPPLIER_IGNITIS,
  },
  {
    id: 'AS0001',
    type: 'Rankinis',
    values: [
      {
        id: 'AS0001-1',
        date: new Date('2021-01-02'),
        forDate: new Date('2021-01-01'),
        value: 1,
        origin: 'akpas',
      },
    ],
    supplier: SUPPLIER_IGNITIS,
  },
];
