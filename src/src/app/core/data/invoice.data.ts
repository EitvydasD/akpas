import { Invoice } from '../types/invoice.types';
import { ACCOUNTS } from './accounts.data';
import { SUPPLIER_IGNITIS } from './supplier.data';

export const INVOICES: Invoice[] = [
  {
    id: 'invoice-1',
    status: 'Sumokėta',
    payDate: new Date('2020-01-01'),
    generationDate: new Date('2019-12-01'),
    supplier: SUPPLIER_IGNITIS,
    accountId: ACCOUNTS[0].id,
    operations: [
      {
        id: '1',
        operation: 'Withdraw',
        date: new Date('2020-01-01'),
        amount: 50.0,
      },
    ],
  },
  {
    id: 'invoice-2',
    status: 'Nesumokėta',
    payDate: new Date('2020-02-01'),
    generationDate: new Date('2020-01-01'),
    supplier: SUPPLIER_IGNITIS,
    accountId: ACCOUNTS[0].id,
    operations: [
      {
        id: '2',
        operation: 'Withdraw',
        date: new Date('2020-02-01'),
        amount: 20.0,
      },
    ],
  },
  {
    id: 'invoice-3',
    status: 'Nesumokėta',
    payDate: new Date('2020-02-01'),
    generationDate: new Date('2020-01-01'),
    supplier: SUPPLIER_IGNITIS,
    accountId: ACCOUNTS[0].id,
    operations: [
      {
        id: '2',
        operation: 'Withdraw',
        date: new Date('2020-02-01'),
        amount: 20.0,
      },
    ],
  },
];
