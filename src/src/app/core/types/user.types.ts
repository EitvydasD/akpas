import { BaseType } from './base.types';

export type User = BaseType & {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: Date;
  personalCode: string;
  password: string;
  balance: number;
  isActive: boolean;

  card?: UserCard;

  settings: UserSettings;
};

export type UserSettings = {
  notifications: UserNotification[];
};

export type UserNotification = {
  name: string;
  enabled: boolean;
};

export type UserCard = {
  id: string;
  cardNumber: string;
  validTo: Date;
  ccv: string;
};
