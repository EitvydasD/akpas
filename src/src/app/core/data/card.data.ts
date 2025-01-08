import { UserCard } from '../types/user.types';

export const CARD_DEFAULT: UserCard = {
  id: '',
  cardNumber: 'xxxx xxxx xxxx xxxx 0041',
  validTo: new Date('2026-01-01'),
  ccv: '000',
};
