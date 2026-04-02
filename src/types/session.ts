export type JWTPayload = {
  sub: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export type SessionData = {
  userId: string;
  email: string;
  name: string;
  role: string;
};
