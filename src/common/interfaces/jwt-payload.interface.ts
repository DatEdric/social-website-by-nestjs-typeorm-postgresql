export interface JwtPayload {
  sub: StaticRange;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
