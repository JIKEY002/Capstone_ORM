import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';

import { PrismaModule } from './modules-system/prisma/prisma.module';
import { TokenModule } from './modules-system/token/token.module';

import { ProtectStrategy } from './common/guard/protect/protect.strategy';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy],
})
export class AppModule {}
