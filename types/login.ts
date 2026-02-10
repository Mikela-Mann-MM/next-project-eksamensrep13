

export type LoginValues = {
  email: string;
  password: string;
};

export type LoginErrors = Partial<
  Record<keyof LoginValues | "form", string>
>;

export type LoginState = {
  values: LoginValues;
  errors: LoginErrors;
};
