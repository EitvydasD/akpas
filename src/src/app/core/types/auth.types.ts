export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  personalCode: string;
};
