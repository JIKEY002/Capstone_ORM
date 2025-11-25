import 'dotenv/config';

export const APP_PORT = process.env.PORT || 3000;
export const ACCESS_TOKENN_SECRET =
  process.env.ACCESS_TOKENN_SECRET || 'default_secret';
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret';

console.log({
  APP_PORT,
  ACCESS_TOKENN_SECRET,
  REFRESH_TOKEN_SECRET,
});
