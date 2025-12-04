import 'dotenv/config';

export const APP_PORT = process.env.PORT || 3000;
export const ACCESS_TOKENN_SECRET =
    process.env.ACCESS_TOKENN_SECRET || 'default_secret';
export const REFRESH_TOKEN_SECRET =
    process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret';

export const HOST = process.env.HOST || 'localhost';
export const PORT_DB = process.env.PORT_DB || 3306;
export const USERNAME_DB = process.env.USERNAME_DB || 'root';
export const PASSWORD_DB = process.env.PASSWORD_DB || '';
export const DATABASE_NAME = process.env.DATABASE_NAME || 'test';

console.log({
    APP_PORT,
    ACCESS_TOKENN_SECRET,
    REFRESH_TOKEN_SECRET,
});
