export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: "CUSTOMER" | "ADMIN";
};

export type AdminSession = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpInput = {
  name: string;
  email: string;
};
