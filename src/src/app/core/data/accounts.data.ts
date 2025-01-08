import { User, UserSettings } from '../types/user.types';
import { CARD_DEFAULT } from './card.data';

export const ACCOUNT_SETTINGS: UserSettings = {
  notifications: [
    {
      name: 'Sąskaitų priminimas',
      enabled: true,
    },
    {
      name: 'Nepateiktų skaitliukų duomenų priminimas',
      enabled: false,
    },
    {
      name: 'Automatinis sąskaitų apmokėjimas',
      enabled: false,
    },
  ],
};

export const ACCOUNTS: User[] = [
  {
    id: 'first-last-account',
    firstName: 'Vardenis',
    lastName: 'Pavardenis',
    phone: '+37060000000',
    email: 'vardenis@pavardenis.com',
    birthDate: new Date('1990-01-01'),
    personalCode: '12345678901',
    password: 'admin',
    balance: 1000,
    isActive: true,
    card: CARD_DEFAULT,
    settings: ACCOUNT_SETTINGS,
  },
];
