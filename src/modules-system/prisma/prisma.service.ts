// src/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import {
    DATABASE_NAME,
    HOST,
    PASSWORD_DB,
    PORT_DB,
    USERNAME_DB,
} from 'src/common/constant/app.constant';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaMariaDb({
            host: HOST,
            port: Number(PORT_DB),
            user: USERNAME_DB,
            password: PASSWORD_DB,
            database: DATABASE_NAME,
            connectionLimit: 5,
        });
        super({ adapter });
    }
}
